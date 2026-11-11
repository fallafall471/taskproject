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
  private readonly taskRepository:Repository<Task>,
  private readonly projectService:ProjectService){}
  
  async create(createTaskDto: CreateTaskDto):Promise<Task> {
    const project = await this.projectService.findOne(createTaskDto.projectId) ;
    const task=this.taskRepository.create({
      title:createTaskDto.title,
      description:createTaskDto.description,
      status:createTaskDto.status,
      project:project
    })
    return this.taskRepository.save(task)
  }

  async findAll() : Promise<Task[]>{
    return this.taskRepository.find({
      relations:{project:true}
    })
  }

  async findOne(id: number) :Promise<Task> {
    const task = await this.taskRepository.findOne({
      where:{id},
      relations:{project:true}
    })
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
    const project = await this.projectService.findOne(
      updateTaskDto.projectId,
    );

    task.project = project;
  }

  if (updateTaskDto.title !== undefined) {
    task.title = updateTaskDto.title;
  }

  if (updateTaskDto.description !== undefined) {
    task.description = updateTaskDto.description;
  }

  return this.taskRepository.save(task);
}

  async remove(id: number) : Promise<void> {
    await this.findOne(id)
    
    await this.taskRepository.delete(id)
  }

  async updateStatut (id:number,updateTaskStatutDto : UpdateTaskStatusDto):Promise<Task>{
    const task = await this.findOne(id)
    task.status = updateTaskStatutDto.status
    return this.taskRepository.save(task)
  }
}

