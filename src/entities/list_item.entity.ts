import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import List from './list.entity';

@Entity('list_items')
export default class ListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', default: false })
  is_done: boolean;

  @ManyToOne(() => List, (list) => list.items)
  @JoinColumn({ name: 'list_id' })
  list: List;
}
