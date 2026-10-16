import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project)
private projectrepository:Repository<Project>){}
  
async create(createProjectDto: CreateProjectDto):Promise<Project> {
    const project =  this.projectrepository.create(createProjectDto)
    return this.projectrepository.save(project)
  }

  async findAll() :Promise<Project[]>{
    return this.projectrepository.find()
  }

  async findOne(id: number):Promise<Project > {
    const project = await this.projectrepository.findOneBy({id})
    if (!project){
      throw new NotFoundException(`Le projet avec l'identifiant ${id} est introuvable.`)
    }
    return project
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) : Promise<Project> {
    const project  = await this.findOne(id);
    
    Object.assign(project,updateProjectDto)

    return this.projectrepository.save(project)
  }

  async remove(id: number):Promise<void> {
    const resultat = await this.findOne(id)
    
    await this.projectrepository.delete(id);
  }
}
