import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Уникальное Значение роли' })
  @IsString({ message: 'Має бути строчкою' })
  readonly value: string;

  @ApiProperty({ example: 'Адміністратор', description: 'Опис ролі' })
  @IsString({ message: 'Simple' })
  readonly description: string;
}
