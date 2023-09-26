import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Унікальне значення ролі',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;

  @ApiProperty({
    example: 1,
    description: 'Ідентифікатор користувача',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
}
