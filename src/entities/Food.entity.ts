import { ObjectId } from 'mongodb';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from './Restaurant.entity';

@Entity('foods', {
  synchronize: false,
})
export class Food {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  verified: boolean;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  keywords: string[];

  @Column()
  score: number;

  @Column()
  photo_url: string;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.foods)
  @JoinColumn({ name: 'food_id' })
  restaurant: Restaurant;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  creation_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at?: Date;
}
