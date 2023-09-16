import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Power } from 'src/entity/power.entity';
import { Repository } from 'typeorm';
import { CreatePowerDto } from './dto/create-power.dto';

@Injectable()
export class PowerService {
  constructor(
    @InjectRepository(Power)
    private powerRepository: Repository<Power>,
  ) {}

  async addPower(dto: CreatePowerDto): Promise<Power> {
    const { heroId, power } = dto;
    const addPower = this.powerRepository.create({
      power,
      hero: { id: heroId },
    });

    await this.powerRepository.save(addPower);
    return addPower;
  }

  async removePower(id: number): Promise<string> {
    await this.powerRepository.delete(id);
    return 'Power deleted';
  }
}
