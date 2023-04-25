import { ObjectId } from 'mongodb';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import { Food } from './Food.entity';

@Entity('restaurants', {
  synchronize: false,
})
export class Restaurant {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  verified: boolean;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  keywords: string[];

  @Column()
  score: number;

  @Column({})
  email: string;

  @Column()
  photo_url: string;

  @Column()
  phone: string;

  @OneToMany((type) => Food, (food) => food.id)
  foods: Food[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  creation_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at?: Date;
}
