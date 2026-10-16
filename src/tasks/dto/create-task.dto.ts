import { IsDate, IsNumber, IsOptional, IsString,IsEnum } from 'class-validator';
import { Status } from '../entities/task.entity';


export class CreateTaskDto {
      
    @IsString()
    Title:string 
    @IsOptional()
    @IsString()
    Descriprtion:string
    @IsEnum(Status)
    @IsOptional()
    status?:Status
    @IsNumber()
    projectId:number
      
}
