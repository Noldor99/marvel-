import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Power } from './power.entity';
import { HeroImg } from './heroImg.entity';

@Entity()
export class Hero extends AbstractEntity<Hero> {
  @Column()
  nickname: string;

  @Column()
  real_name: string;

  @Column('text')
  origin_description: string;

  @Column()
  catch_phrase: string;

  @Column()
  title_img: string;

  @OneToMany(() => Power, (power) => power.hero, { onDelete: 'CASCADE' })
  powers: Power[];

  @OneToMany(() => HeroImg, (heroImg) => heroImg.hero)
  images: HeroImg[];
}
