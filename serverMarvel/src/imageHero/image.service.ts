import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroImg } from 'src/entity/heroImg.entity';
import { FilesService } from 'src/files/files.service';
import { HeroService } from 'src/hero/hero.service';
import { Repository } from 'typeorm';
import { CreateImageHeroDto } from './dto/create-imageHero.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(HeroImg)
    private readonly imageRepository: Repository<HeroImg>,
    private fileService: FilesService,
    private heroService: HeroService,
  ) {}

  async create(dto: CreateImageHeroDto, imageHero: any) {
    console.log(imageHero);
    const fileName = await this.fileService.createFile(imageHero[0]);

    const hero = await this.heroService.findOne(dto.heroId);

    const image_hero = this.imageRepository.create({
      hero,
      imageHero: fileName,
    });

    return await this.imageRepository.save(image_hero);
  }

  async remove(id: number) {
    return await this.imageRepository.delete(id);
  }
}
