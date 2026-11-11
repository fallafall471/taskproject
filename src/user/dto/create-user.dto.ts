import { IsEmail, IsEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
@IsString()
prenom:string
@IsString()
nom:string
@IsEmail()
email:string
@IsStrongPassword()
password:string



}
