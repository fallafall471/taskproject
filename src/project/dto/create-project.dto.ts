import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {  IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateProjectDto {
    @ApiProperty({description:"nom du project",example: "cree Api"})
    @IsString()
    name:string

    @ApiPropertyOptional({description:"decrire le project cree",example:"ce project est une app back end ecommerce"})
    @IsOptional()
    @IsString()
    description:string
    @IsNumber()
    userId:number

}
