import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ProjectModule } from '../project/project.module';
import { ProjectService } from '../project/project.service';

@Module({
  imports:[TypeOrmModule.forFeature([Task]),
  ProjectModule],
  controllers: [TasksController],
  providers: [TasksService],
  
})
export class TasksModule {}
