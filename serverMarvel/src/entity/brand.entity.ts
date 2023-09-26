import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Hero } from 'src/entity/hero.entity';

@Entity()
export class Brand extends AbstractEntity<Brand> {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Hero, (hero) => hero.brand)
  devices: Hero[];
}
