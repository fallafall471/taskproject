import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../project/entities/project.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    prenom:string

    @Column()
    nom:string

    @Column()
    email:string

    @Column()
    password:string

    @OneToMany(()=>Project,(project)=>project.user)
    project:Project[]

}
