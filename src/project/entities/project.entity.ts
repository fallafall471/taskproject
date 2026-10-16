
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,OneToMany
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  Name: string;
  @Column()
  Description?: string;
  @CreateDateColumn({ type: 'datetime' })
  CreateAt: Date;
  @OneToMany(()=>Task,(tasks)=>tasks.project)
  tasks:Task[]
}
