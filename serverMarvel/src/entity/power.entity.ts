import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Hero } from './hero.entity';

@Entity('power_')
export class Power extends AbstractEntity<Power> {
  @Column()
  power: string;

  @ManyToOne(() => Hero, (hero) => hero.powers)
  hero: Hero;
}
