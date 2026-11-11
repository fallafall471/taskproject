import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private readonly userRepository:Repository<User>  
  ){}
  async create(createUserDto: CreateUserDto):Promise<User> {
    const {password,...rest} = createUserDto
    const hashPassword = await bcrypt.hash(password,10)
    const user = this.userRepository.create({
      ...rest,password:hashPassword
    })
    return this.userRepository.save(user);
  }

  async findAll() : Promise<User[]>{
    return  this.userRepository.find()
  }

  async findOne(id: number) :Promise<User>{
    const user = await this.userRepository.findOneBy({id})
    if(!user){
      throw new NotFoundException(`l'utilisateur avec id: ${id} exist pas `)
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<User|null> {
    const user =  await this.findOne(id)
    const {password,oldPassword,...rest} = updateUserDto
    if(password){
      if (oldPassword !== undefined){
        const oldPasswordVerification = await bcrypt.compare(oldPassword,user.password)
        if(!oldPasswordVerification){
          throw new UnauthorizedException("vous avez pas le droit de changer ce mots de passe")
        }
          user.password = await bcrypt.hash(password,10)

      }
    }
    Object.assign(user,rest)
    return this.userRepository.save(user);
  }

  async findUserEmail (email:string):Promise<User>{
    const user = await this.userRepository.findOneBy({email})
    if(!user){
      throw new UnauthorizedException(`Identifiant incorect`)
    }
    return user
  }

  async remove(id: number):Promise<void> {
    const user = await this.findOne(id)
    await this.userRepository.delete(id)
  }
}
