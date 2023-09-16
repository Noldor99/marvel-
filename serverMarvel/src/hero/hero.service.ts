import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hero } from 'src/entity/hero.entity';
import { Power } from 'src/entity/power.entity';
import { FilesService } from 'src/files/files.service';
import { EntityManager, Repository } from 'typeorm';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private heroRepository: Repository<Hero>,
    @InjectRepository(Power)
    private powerRepository: Repository<Power>,
    private readonly entityManager: EntityManager,
    private fileService: FilesService,
  ) {}

  async create(createHeroDto: CreateHeroDto, title_img: any) {
    const { nickname, real_name, catch_phrase, origin_description } =
      createHeroDto;

    console.log(title_img);

    const fileName = await this.fileService.createFile(title_img);

    const hero = new Hero({
      nickname,
      real_name,
      catch_phrase,
      origin_description,
      title_img: fileName,
    });

    return await this.entityManager.save(hero);
  }

  async findAllHero(page: number, limit: number) {
    const [heroes, total] = await this.heroRepository.findAndCount({
      relations: { images: true, powers: true },
      take: limit,
      skip: (page - 1) * limit,
    });

    return [heroes, total];
  }

  async findOne(id: number): Promise<Hero> {
    const hero = await this.heroRepository.findOne({
      where: { id },
      relations: { images: true, powers: true },
    });

    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }

    return hero;
  }
  async editHero(heroId: number, updateHeroDto: UpdateHeroDto, title_img: any) {
    const { nickname, real_name, catch_phrase, origin_description } =
      updateHeroDto;
    const hero = await this.heroRepository.findOne({
      where: { id: heroId },
      relations: { powers: true },
    });

    if (!hero) {
      throw new NotFoundException(`Hero with ID ${heroId} not found`);
    }
    if (title_img) {
      const fileName = await this.fileService.createFile(title_img);
      hero.title_img = fileName;
    }

    if (nickname) hero.nickname = nickname;
    if (real_name) hero.real_name = real_name;
    if (catch_phrase) hero.catch_phrase = catch_phrase;
    if (origin_description) hero.origin_description = origin_description;

    const updateHero = await this.heroRepository.save(hero);
    return updateHero;
  }

  async remove(id: number) {
    const hero = await this.heroRepository.findOne({
      where: { id },
      relations: { powers: true },
    });

    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }
    await this.powerRepository.remove(hero.powers);

    return await this.heroRepository.remove(hero);
  }
}
