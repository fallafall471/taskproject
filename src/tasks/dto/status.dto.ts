import { IsEnum } from 'class-validator';
import { Status } from '../entities/task.entity';

export class UpdateTaskStatusDto {
  @IsEnum(Status)
  status: Status;
}