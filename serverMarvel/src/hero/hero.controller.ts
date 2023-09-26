import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
  Put,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindAllWithPaginationDto } from './dto/findAllWithPagination.dto';

@ApiTags('hero')
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('title_img'))
  create(@Body() createHeroDto: CreateHeroDto, @UploadedFile() title_img) {
    return this.heroService.create(createHeroDto, title_img);
  }

  @Get('pagination')
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  @ApiQuery({
    name: 'brandName',
    type: String,
    required: false,
    example: 'Simple',
  })
  @ApiQuery({ name: 'minPrice', type: Number, required: false, example: 0 })
  @ApiQuery({ name: 'maxPrice', type: Number, required: false, example: 1000 })
  async findAllWithPagination(@Query() params: FindAllWithPaginationDto) {
    const [heroes, total, maxPrice] = await this.heroService.findAllHero(
      params,
    );
    return { heroes, total, maxPrice };
  }

  @Get('search')
  @ApiQuery({ name: 'query', type: String, required: false, example: 'super' })
  async searchHeroes(@Query('query') query: string) {
    const heroes = await this.heroService.searchHeroesByName(query);
    return heroes;
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the hero' })
  getOne(@Param('id') id: number) {
    return this.heroService.findOne(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('title_img'))
  async update(
    @Param('id') heroId: number,
    @Body() updateHeroDto: UpdateHeroDto,
    @UploadedFile() title_img,
  ) {
    return await this.heroService.editHero(heroId, updateHeroDto, title_img);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(+id);
  }
}
