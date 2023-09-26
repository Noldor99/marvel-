import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity()
export class Role extends AbstractEntity<Role> {
  @ApiProperty({ example: 'ADMIN', description: 'Унікальне значення ролі' })
  @Column({ unique: true, nullable: false })
  value: string;

  @ApiProperty({ example: 'Адміністратор', description: 'Опис ролі' })
  @Column({ nullable: false })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
