import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero } from 'src/entity/hero.entity';
import { HeroImg } from 'src/entity/heroImg.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Power } from 'src/entity/power.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [FilesModule, TypeOrmModule.forFeature([Hero, HeroImg, Power])],
  controllers: [HeroController],
  providers: [HeroService],
  exports: [HeroService],
})
export class HeroModule {}
