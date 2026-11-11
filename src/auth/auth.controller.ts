import { Controller, Post, Request, UseGuards ,Body} from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guard/local-auth.guard';
import {Public} from './public.decorateur'
import {UserService} from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags("auth")

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userservice:UserService
  ) {}
  
  @ApiOperation({summary:"cette methode donne acces a la route pour ce connectez"})
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Body() createAuthDto:CreateAuthDto, @Request() req:any){
    return this.authService.login(req.user)
  }

  @ApiOperation({summary:"cette methode donne acces a la route pour inscrire"})
  @Public()
  @Post("signup")
  signup(@Body() createUserDto : CreateUserDto){
    return this.userservice.create(createUserDto);
  }
}
