import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/entity/brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    return this.brandRepository.find();
  }

  create(createBrandDto: CreateBrandDto) {
    const newBrand = this.brandRepository.create(createBrandDto);
    return this.brandRepository.save(newBrand);
  }

  async getBrandByName(name: string) {
    const brand = await this.brandRepository.findOne({
      where: { name },
    });
    return brand;
  }

  async remove(name: string) {
    const brand = this.getBrandByName(name);
    await this.brandRepository.delete((await brand).id);
  }
}
