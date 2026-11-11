import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // 1. Comment on extrait le token de la requête HTTP
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // 2. Est-ce qu'on rejette automatiquement un token périmé ? (true = non, false = oui)
      ignoreExpiration: false,
      
      // 3. La clé secrète pour vérifier la signature du token
      secretOrKey: configService.get<string>('DATABASE_signature')!, 
    });
  }

 
  async validate(payload: any) {
    // Ce que tu retournes ici est automatiquement attaché à `request.user`
    return { userId: payload.sub, email: payload.email };
  }
}