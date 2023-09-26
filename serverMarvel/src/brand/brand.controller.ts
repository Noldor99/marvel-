import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() name: CreateBrandDto) {
    return this.brandService.create(name);
  }

  @Get()
  async findAll() {
    return this.brandService.findAll();
  }

  @Get(':name')
  async getBrandByName(@Param('name') name: string) {
    return this.brandService.getBrandByName(name);
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return this.brandService.remove(name);
  }
}
