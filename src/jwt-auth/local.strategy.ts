import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string) {
    console.log('VALIDATE RUNNING');
    console.log(username, password);

    const user = {
      id: 1,
      username: 'shripad',
      password: 'admin123',
      role: 'admin',
    };

    if (
      username !== user.username ||
      password !== user.password
    ) {
      throw new UnauthorizedException();
    }

    return user;
  }
}