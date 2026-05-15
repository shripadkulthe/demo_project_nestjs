import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
        password: 'admin123',
        role: 'admin',
      };

      const hashedPassword =
        await bcrypt.hash(
        user.password,
        10,
      );

      console.log(
        'HASHED PASSWORD:',
        hashedPassword,
    );

      const isPasswordValid =
        await bcrypt.compare(
        'admin123',
        hashedPassword,
    );

      console.log(
        'PASSWORD MATCH:',
        isPasswordValid,
    );

      const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
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