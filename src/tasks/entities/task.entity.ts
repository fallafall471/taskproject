import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../project/entities/project.entity";

export enum Status{
    TODO = "à faire",
    IN_PROGRESS = "en cours",
    DONE = "terminée"
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    Title:string
    @Column()
    Description?:string
    @Column({type:"enum",enum:Status,default:Status.TODO})
    status:Status
    @ManyToOne(()=>Project,(project)=>project.tasks)
    project:Project
    @CreateDateColumn({type:"datetime"})
    createAt:Date
}
