import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';
import ListItem from './list_item.entity';

@Entity('lists')
export default class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  color: string;

  @ManyToOne(() => User, (user) => user.lists)
  user: User;

  @OneToMany(() => ListItem, (list_item) => list_item.list)
  items: ListItem[];
}
