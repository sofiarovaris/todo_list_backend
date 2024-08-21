import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import List from './list.entity';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => List, (list) => list.user)
  lists: List[];
}
