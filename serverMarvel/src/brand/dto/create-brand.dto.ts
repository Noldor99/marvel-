import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: 'Apple', description: 'Name of the brand' })
  @IsString()
  name: string;
}
