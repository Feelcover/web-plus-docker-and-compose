import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-yandex';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('YANDEX_CLIENT_ID'),
      clientSecret: configService.get<string>('YANDEX_CLIENT_SECRET'),
      callbackURL: configService.get<string>('YANDEX_REDIRECT_URI'),
    });
  }

  // async validate(accessToken: string, refreshToken: string, profile: Profile) {
  //   const user = await this.authService.validateFromYandex(profile);

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }

  //   return user;
  // }
}