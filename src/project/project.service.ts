import { Injectable } from '@nestjs/common';
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
    const Project = await this.projectrepository.create(createProjectDto)
    return this.projectrepository.save(Project)
  }

  async findAll() :Promise<Project[]>{
    return this.projectrepository.find()
  }

  findOne(id: number):Promise<Project | null> {
    return this.projectrepository.findOneBy({id});
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async remove(id: number):Promise<void> {
    await this.projectrepository.delete(id);
  }
}
