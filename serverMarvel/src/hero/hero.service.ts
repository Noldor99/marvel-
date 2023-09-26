import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from 'src/brand/brand.service';
import { Hero } from 'src/entity/hero.entity';
import { Power } from 'src/entity/power.entity';
import { FilesService } from 'src/files/files.service';
import { EntityManager, ILike, Repository, Between } from 'typeorm';
import { CreateHeroDto } from './dto/create-hero.dto';
import { FindAllWithPaginationDto } from './dto/findAllWithPagination.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private heroRepository: Repository<Hero>,
    @InjectRepository(Power)
    private powerRepository: Repository<Power>,
    private readonly entityManager: EntityManager,
    private readonly brandService: BrandService,
    private fileService: FilesService,
  ) {}

  async create(createHeroDto: CreateHeroDto, title_img: any) {
    const {
      nickname,
      real_name,
      brandName,
      catch_phrase,
      origin_description,
      price,
    } = createHeroDto;

    const brand = await this.brandService.getBrandByName(brandName);

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandName} not found`);
    }

    const fileName = await this.fileService.createFile(title_img);

    const hero = new Hero({
      nickname,
      real_name,
      catch_phrase,
      origin_description,
      price,
      brand,
      title_img: fileName,
    });

    return await this.entityManager.save(hero);
  }

  async findAllHero(dto: FindAllWithPaginationDto) {
    const { page = 1, limit = 4, brandName, minPrice = 0, maxPrice } = dto;

    const whereCondition: any = {
      brand: { name: brandName },
    };

    if (minPrice !== undefined && maxPrice !== undefined) {
      whereCondition.price = Between(minPrice, maxPrice);
    }

    const [heroes, total] = await this.heroRepository.findAndCount({
      where: whereCondition,
      relations: { images: true, powers: true, brand: true },
      take: limit,
      skip: (page - 1) * limit,
    });

    // Отримати найвищу ціну
    const maxPriceTotal = await this.heroRepository
      .createQueryBuilder('hero')
      .select('MAX(hero.price)', 'maxPrice')
      .getRawOne();

    return [heroes, total, maxPriceTotal.maxPrice];
  }

  async findOne(id: number): Promise<Hero> {
    const hero = await this.heroRepository.findOne({
      where: { id },
      relations: { images: true, powers: true, brand: true },
    });

    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }

    return hero;
  }
  async editHero(heroId: number, updateHeroDto: UpdateHeroDto, title_img: any) {
    const {
      nickname,
      real_name,
      brandName,
      catch_phrase,
      origin_description,
      price,
    } = updateHeroDto;
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

    if (price) {
      hero.price = price;
    }

    if (brandName) {
      const brand = await this.brandService.getBrandByName(brandName);
      if (!brand) {
        throw new NotFoundException(`Brand with ID ${brandName} not found`);
      }
      hero.brand = brand;
    }

    if (nickname) hero.nickname = nickname;
    if (real_name) hero.real_name = real_name;
    if (catch_phrase) hero.catch_phrase = catch_phrase;
    if (origin_description) hero.origin_description = origin_description;

    const updateHero = await this.heroRepository.save(hero);
    return updateHero;
  }

  async searchHeroesByName(query: string): Promise<Hero[]> {
    console.log(query);
    const heroes = await this.heroRepository.find({
      where: {
        nickname: ILike(`%${query}%`),
      },
      relations: { brand: true, powers: true },
    });
    return heroes;
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
