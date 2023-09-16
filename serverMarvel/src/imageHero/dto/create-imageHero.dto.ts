import { ApiProperty } from '@nestjs/swagger';

export class CreateImageHeroDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  readonly imageHero: any;

  @ApiProperty()
  readonly heroId: number;
}
