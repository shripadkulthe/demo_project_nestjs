import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { type StringValue } from 'ms';
import { JwtAuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { RolesGuard } from './roles.guard';
import { DatabaseModule } from 'src/database/database.module';
import { MailService } from './mail.service';
import { LocalStrategy } from 'src/jwt-auth/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local', session: false }),

    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nestjs_auth',
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET!,

        signOptions: {
          expiresIn: configService.get<StringValue>('jwt.expiresIn') || '1d',
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [JwtAuthService, JwtStrategy, RolesGuard, MailService, LocalStrategy],

  exports: [JwtAuthService],
})
export class JWTAuthModule {}
