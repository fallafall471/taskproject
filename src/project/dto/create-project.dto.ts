import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    Name:string

    @IsOptional()
    @IsString()
    Descriprtion:string

}
