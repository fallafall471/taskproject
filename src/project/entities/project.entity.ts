
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,OneToMany,
  ManyToOne
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description?: string;
  @CreateDateColumn()
  CreateAt: Date;
  @OneToMany(()=>Task,(tasks)=>tasks.project)
  tasks:Task[]
  @ManyToOne(()=>User,(user)=>user.project)
  user:User
}
