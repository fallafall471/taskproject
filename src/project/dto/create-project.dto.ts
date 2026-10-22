import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';


export class CreateProjectDto {
    @ApiProperty({description:"nom du project",example: "cree Api"})
    @IsString()
    Name:string

    @ApiPropertyOptional({description:"decrire le project cree",example:"ce project est une app back end ecommerce"})
    @IsOptional()
    @IsString()
    Description:string

}
