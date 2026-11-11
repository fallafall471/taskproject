

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service.js';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
      
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email,password);
    if (!user) {
      throw new UnauthorizedException();
      
    }
    return user;
  }
}
