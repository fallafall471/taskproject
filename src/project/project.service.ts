import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';


@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project)
private projectRepository:Repository<Project>,
private readonly userService : UserService){}
  
async create(createProjectDto: CreateProjectDto):Promise<Project> {
    const {userId,...rest} = createProjectDto

    const user =await  this.userService.findOne(userId)

    const project = this.projectRepository.create({
      ...rest,
      user,
    })
    return await this.projectRepository.save(project)

  }

  async findAll() :Promise<Project[]>{
    return this.projectRepository.find({
      relations:{user:true}
    })
  }

  async findOne(id: number):Promise<Project > {
    const project = await this.projectRepository.findOne({
      where:{id:id},
      relations:{user:true}
    })
    if (!project){
      throw new NotFoundException(`Le projet avec l'identifiant ${id} est introuvable.`)
    }
    return project
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
  const project = await this.findOne(id);

  // 1. Mise à jour de la description uniquement si elle est fournie
  if (updateProjectDto.description !== undefined) {
    project.description = updateProjectDto.description;
  }

  // 2. Mise à jour du nom uniquement s'il est fourni
  if (updateProjectDto.name !== undefined) {
    project.name = updateProjectDto.name;
  }

  // 3. Mise à jour du user avec le VRAI userId du DTO
  if (updateProjectDto.userId !== undefined) {
    // On passe updateProjectDto.userId et NON project.id
    const user = await this.userService.findOne(updateProjectDto.userId);
    project.user = user;
  }

  return this.projectRepository.save(project);
}

  async remove(id: number):Promise<void> {
    const resultat = await this.findOne(id)
    
    await this.projectRepository.delete(id);
  }
}
