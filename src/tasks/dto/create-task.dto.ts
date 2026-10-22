import { IsDate, IsNumber, IsOptional, IsString,IsEnum } from 'class-validator';
import { Status } from '../entities/task.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateTaskDto {
    @ApiProperty({description:"titre de la tache",example:"installer les dependances"})  
    @IsString()
    Title:string 

    @ApiPropertyOptional({description:"description de la tache",example:"installer typeorm"})
    @IsOptional()
    @IsString()
    Descriprtion:string
    @ApiPropertyOptional({description:"status de la tache ",example:"Todo"})
    @IsEnum(Status)
    @IsOptional()
    status?:Status
    @ApiProperty({description:"a quelle project appartient cette tache",example:'project avec id 1'})
    @IsNumber()
    projectId:number
      
}
