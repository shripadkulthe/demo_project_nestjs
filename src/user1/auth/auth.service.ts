import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User1Service } from 'src/user1/user1.service';

@Injectable()
export class AuthService {
  constructor(
    private user1Service: User1Service,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.user1Service.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid email or password');

    const { password, ...result } = user.toObject(); 
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.type };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: any) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    return this.user1Service.addUser1({
      ...userData,
      password: hashedPassword,
    });
  }
}
