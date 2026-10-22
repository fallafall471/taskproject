import { IsEnum } from 'class-validator';
import { Status } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({description:'modifier une tache',example:'en cour'})
  @IsEnum(Status)
  status: Status;
}