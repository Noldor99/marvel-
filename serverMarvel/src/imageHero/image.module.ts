import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroImg } from 'src/entity/heroImg.entity';
import { FilesModule } from 'src/files/files.module';
import { HeroModule } from 'src/hero/hero.module';

@Module({
  imports: [FilesModule, HeroModule, TypeOrmModule.forFeature([HeroImg])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
