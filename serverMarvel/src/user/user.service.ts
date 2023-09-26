import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'; // Заміни на bcryptjs
import { JwtService } from '@nestjs/jwt';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly roleService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existUser) throw new BadRequestException('This email already exists!');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // 10 - кількість раундів хешування

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ email: createUserDto.email });

    return { user, token };
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      relations: { roles: true },
    });
  }

  async findById(id: number) {
    return this.userRepository.find({
      where: { id },
      relations: { roles: true },
    });
  }

  async getAllUsers() {
    return this.userRepository.find({ relations: ['roles'] });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      relations: ['roles'],
    });
    const role = await this.roleService.getRoleByValue(dto.value);

    if (!user || !role) {
      throw new HttpException(
        'Пользователь или роль не найдены',
        HttpStatus.NOT_FOUND,
      );
    }

    user.roles = [...user.roles, role];
    await this.userRepository.save(user);

    return dto;
  }

  async deleteRoleFromUser(userId: number, roleValue: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    const roleIndex = user.roles.findIndex((role) => role.value == roleValue);

    if (roleIndex === -1) {
      throw new HttpException(
        'Роль не знайдена у користувача',
        HttpStatus.NOT_FOUND,
      );
    }

    user.roles.splice(roleIndex, 1);
    await this.userRepository.save(user);

    return `Роль з value ${roleValue} видалена з користувача з id ${userId}`;
  }
}
