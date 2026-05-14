import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';

@Controller('jwt-auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('login')
  login() {
    return this.authService.login();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)

  @Roles(Role.ADMIN)

  @Get('profile')
  getProfile(@Request() req: any) {

    return {
      message: 'Admin route accessed',
      user: req.user,
    };
  }
}