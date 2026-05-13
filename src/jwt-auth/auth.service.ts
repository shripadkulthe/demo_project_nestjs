import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login() {

    try {

      console.log('LOGIN STARTED');

      console.log(
        'JWT SERVICE:',
        this.jwtService,
      );

      const user = {
        id: 1,
        username: 'shripad',
      };

      const payload = {
        sub: user.id,
        username: user.username,
      };

      console.log('PAYLOAD:', payload);

      const token =
        this.jwtService.sign(payload);

      console.log('TOKEN:', token);

      return {
        access_token: token,
      };

    } catch (error) {

      console.log(
        'LOGIN ERROR:',
        error,
      );

      throw error;
    }
  }
}