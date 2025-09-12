import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User1Service } from 'src/user1/user1.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly user1Service: User1Service,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.user1Service.findByEmail(email);

    if (user && await bcrypt.compare(pass, user.password)) {
      
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid email or password');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
