import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Delete,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateImageHeroDto } from './dto/create-imageHero.dto';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('imageHero'))
  create(@Body() dto: CreateImageHeroDto, @UploadedFiles() imageHero) {
    return this.imageService.create(dto, imageHero);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
