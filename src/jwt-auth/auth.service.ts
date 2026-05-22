import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { type StringValue } from 'ms';
import { DatabaseService } from 'src/database/database.service';
import { BadRequestException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
    private readonly mailService: MailService,
  ) {}

  async login() {
    try {
      console.log('LOGIN STARTED');

      console.log('JWT SERVICE:', this.jwtService);

      const user = {
        id: 1,
        username: 'shripad',
        password: 'admin123',
        role: 'admin',
      };

      const hashedPassword = await bcrypt.hash(user.password, 10);

      console.log('HASHED PASSWORD:', hashedPassword);

      const isPasswordValid = await bcrypt.compare('admin123', hashedPassword);

      console.log('PASSWORD MATCH:', isPasswordValid);

      const payload: {
        sub: number;
        username: string;
        role: string;
      } = {
        sub: user.id,
        username: user.username,
        role: user.role,
      };

      console.log('PAYLOAD:', payload);

      const access_token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN as StringValue,
      });

      const refresh_token = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as StringValue,
      });

      console.log('ACCESS TOKEN:', access_token);

      console.log('REFRESH TOKEN:', refresh_token);

      const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);

      this.databaseService.saveRefreshToken(user.id, hashedRefreshToken);

      console.log('HASHED REFRESH TOKEN STORED:', hashedRefreshToken);

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      console.log('LOGIN ERROR:', error);

      throw error;
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      console.log('REFRESH PAYLOAD:', payload);

      const storedToken = this.databaseService.getRefreshToken(payload.sub);

      if (!storedToken) {
        throw new UnauthorizedException('Refresh token not found');
      }

      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        storedToken,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      console.log('REFRESH TOKEN VALID:', isRefreshTokenValid);

      const newPayload = {
        sub: payload.sub,
        username: payload.username,
        role: payload.role,
      };

      const access_token = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN as StringValue,
      });

      console.log('NEW ACCESS TOKEN:', access_token);

      return {
        access_token,
      };
    } catch (error) {
      console.log('REFRESH TOKEN ERROR:', error);

      throw error;
    }
  }

  logout(userId: number) {
    const storedToken = this.databaseService.getRefreshToken(userId);

    if (!storedToken) {
      throw new UnauthorizedException('User already logged out');
    }

    this.databaseService.removeRefreshToken(userId);

    console.log(`REFRESH TOKEN REMOVED FOR USER ${userId}`);

    return {
      message: 'Logout successful',
    };
  }
  async forgotPassword(email: string) {
    const user = {
      id: 1,
      email: 'test@gmail.com',
    };

    if (user.email !== email) {
      throw new BadRequestException('User not found');
    }

    const resetToken = randomBytes(32).toString('hex');

    const expiry = new Date();

    expiry.setHours(expiry.getHours() + 1);

    this.databaseService.saveResetPasswordToken(user.id, resetToken, expiry);

    console.log('RESET TOKEN:', resetToken);

    return {
      message: 'Password reset email sent',
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const storedData = this.databaseService.getResetPasswordToken(token);

    if (!storedData) {
      throw new BadRequestException('Invalid token');
    }

    if (storedData.expires < new Date()) {
      throw new BadRequestException('Token expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    console.log('NEW HASHED PASSWORD:', hashedPassword);

    this.databaseService.removeResetPasswordToken(token);

    return {
      message: 'Password reset successful',
    };
  }

  async register() {
    const user = {
      id: 1,
      email: 'test@gmail.com',
      isVerified: false,
    };

    const verificationToken = randomBytes(32).toString('hex');

    const expiry = new Date();

    expiry.setHours(expiry.getHours() + 1);

    this.databaseService.saveEmailVerificationToken(
      user.id,
      verificationToken,
      expiry,
    );

    console.log('EMAIL VERIFICATION TOKEN:', verificationToken);

    await this.mailService.sendVerificationEmail(user.email, verificationToken);

    return {
      message: 'Registration successful. Verify your email.',
    };
  }

  async verifyEmail(token: string) {
    const storedData = this.databaseService.getEmailVerificationToken(token);

    if (!storedData) {
      throw new BadRequestException('Invalid verification token');
    }

    if (storedData.expires < new Date()) {
      throw new BadRequestException('Verification token expired');
    }

    this.databaseService.removeEmailVerificationToken(token);

    console.log(`EMAIL VERIFIED FOR USER ${storedData.userId}`);

    return {
      message: 'Email verified successfully',
    };
  }
}
