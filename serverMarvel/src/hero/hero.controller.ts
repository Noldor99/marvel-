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
  async findAllWithPagination(
    @Query('page') page = 1,
    @Query('limit') limit = 4,
  ) {
    const [heroes, total] = await this.heroService.findAllHero(page, limit);
    return { heroes, total };
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
