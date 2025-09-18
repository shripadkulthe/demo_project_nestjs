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
    const userId = user._id.toString(); 
    const payload = { email: user.email, sub: userId, role: user.type };

    const accessToken = this.jwtService.sign(payload, {
      secret: 'secretKey123',
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: 'refreshSecret123',
      expiresIn: '7d',
    });

    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    await this.user1Service.updateUser1(userId, { refreshToken: hashedRefresh });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
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

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.user1Service.getUser1(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) throw new UnauthorizedException();

    const payload = { email: user.email, sub: user._id.toString(), role: user.type };

    const newAccessToken = this.jwtService.sign(payload, {
      secret: 'secretKey123',
      expiresIn: '15m',
    });

    const newRefreshToken = this.jwtService.sign(payload, {
      secret: 'refreshSecret123',
      expiresIn: '7d',
    });

    const hashedRefresh = await bcrypt.hash(newRefreshToken, 10);
    await this.user1Service.updateUser1(user._id.toString(), { refreshToken: hashedRefresh });

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }

  async logout(userId: string) {
    await this.user1Service.updateUser1(userId, { refreshToken: null });
  }
}
