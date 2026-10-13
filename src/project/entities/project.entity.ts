import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
