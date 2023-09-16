import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Hero } from './hero.entity';

@Entity()
export class HeroImg extends AbstractEntity<HeroImg> {
  @Column()
  imageHero: string;

  @ManyToOne(() => Hero, (hero) => hero.images)
  hero: Hero;
}
