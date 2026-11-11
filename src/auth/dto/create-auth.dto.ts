import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string  

}
