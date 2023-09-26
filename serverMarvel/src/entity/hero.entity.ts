import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Power } from './power.entity';
import { HeroImg } from './heroImg.entity';
import { Brand } from './brand.entity';

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

  @Column({ nullable: true })
  price: number;

  @OneToMany(() => Power, (power) => power.hero, { onDelete: 'CASCADE' })
  powers: Power[];

  @OneToMany(() => HeroImg, (heroImg) => heroImg.hero, { onDelete: 'CASCADE' })
  images: HeroImg[];

  @ManyToOne(() => Brand, (brand) => brand.devices)
  brand: Brand;
}
