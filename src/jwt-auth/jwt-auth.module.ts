import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { type StringValue } from 'ms';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [

    PassportModule,

    JwtModule.registerAsync({

  imports: [ConfigModule],

  inject: [ConfigService],

  useFactory: async (
    configService: ConfigService,
  ) => ({

    secret:
      process.env.JWT_SECRET!,

    signOptions: {
      expiresIn:
        configService.get<StringValue>(
          'jwt.expiresIn',
        ) || '1d',
      },
    }),
  }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],

  exports: [AuthService],
})
export class JWTAuthModule {}