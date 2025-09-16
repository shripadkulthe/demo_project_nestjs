import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/user1/jwt.strategy';
import { User1Module } from 'src/user1/user1.module';
import { LocalStrategy } from '../local.strategy';

@Module({
  imports: [
    User1Module,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey123', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy,LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
