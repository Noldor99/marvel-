import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';

@Entity({ name: 'roles' })
export class Role {
  @ApiProperty({ example: '1', description: 'Уникальний ідентифікатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Унікальне значення ролі' })
  @Column({ unique: true, nullable: false })
  value: string;

  @ApiProperty({ example: 'Адміністратор', description: 'Опис ролі' })
  @Column({ nullable: false })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
