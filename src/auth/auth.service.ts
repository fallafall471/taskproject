import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService:JwtService,
    private readonly userService:UserService
  ){}

  async validateUser (email:string,password:string):Promise<any>{

    const user = await this.userService.findUserEmail(email)

    console.log(`user recupere : ${user}`)

    if(!user.password){
      throw new UnauthorizedException("identifiant incorect")
      console.log(user.password)
    }

    const verifactionPassword = await bcrypt.compare(password,user.password)

    if(!verifactionPassword){
      throw new UnauthorizedException("Identifiant incorect")
    }

    const {password:passWord,...rest} = user
    return rest
  }

  async login(user:any):Promise<any>{
    const playload = {sub:user.id,email:user.email}
    return {
      access:this.jwtService.sign(playload)
    }
  }
}
