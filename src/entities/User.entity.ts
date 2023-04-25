import { createHmac } from 'crypto';
import { ObjectId } from 'mongodb';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('users', {
  synchronize: false,
})
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  verified: boolean;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  photo_url: string;

  @Column()
  phone: string;

  @Column('string', { select: false })
  password: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  creation_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = createHmac('sha256', this.password).digest('hex');
    }
  }
}
