import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status, Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ProjectService } from '../project/project.service';
import { UpdateTaskStatusDto } from './dto/status.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task)
  private readonly taskrepository:Repository<Task>,
  private readonly projectservice:ProjectService){}
  
  async create(createTaskDto: CreateTaskDto):Promise<Task> {
    const project = await this.projectservice.findOne(createTaskDto.projectId) ;
    const task=this.taskrepository.create({
      Title:createTaskDto.Title,
      Description:createTaskDto.Descriprtion,
      status:createTaskDto.status,
      project:project
    })
    return this.taskrepository.save(task)
  }

  async findAll() : Promise<Task[]>{
    return this.taskrepository.find()
  }

  async findOne(id: number) :Promise<Task> {
    const task = await this.taskrepository.findOneBy({id})
    if(!task){
      throw new NotFoundException(`La tache avec l'identifiant ${id} est introuvable.`)
    }
    return task;
  }

  async update(
  id: number,
  updateTaskDto: UpdateTaskDto,
): Promise<Task> {
  const task = await this.findOne(id);

  if (updateTaskDto.projectId !== undefined) {
    const project = await this.projectservice.findOne(
      updateTaskDto.projectId,
    );

    task.project = project;
  }

  if (updateTaskDto.Title !== undefined) {
    task.Title = updateTaskDto.Title;
  }

  if (updateTaskDto.Descriprtion !== undefined) {
    task.Description = updateTaskDto.Descriprtion;
  }

  return this.taskrepository.save(task);
}

  async remove(id: number) : Promise<void> {
    await this.findOne(id)
    
    await this.taskrepository.delete(id)
  }

  async updateStatut (id:number,updatetaskstatutdto : UpdateTaskStatusDto):Promise<Task>{
    const task = await this.findOne(id)
    task.status = updatetaskstatutdto.status
    return this.taskrepository.save(task)
  }
}

