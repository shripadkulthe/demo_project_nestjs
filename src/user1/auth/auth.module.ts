import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/user1/jwt.strategy';
import { User1Module } from 'src/user1/user1.module';
import { LocalStrategy } from '../local.strategy';
import { RefreshTokenStrategy } from 'src/user1/refresh-token.strategy';

@Module({
  imports: [
    User1Module,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtStrategy,LocalStrategy,RefreshTokenStrategy,],
  controllers: [AuthController],
})
export class AuthModule {}
