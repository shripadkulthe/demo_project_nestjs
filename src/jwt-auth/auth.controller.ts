import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('jwt-auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('login')
  login() {
    return this.authService.login();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {

    return {
      message: 'Protected route accessed',
      user: req.user,
    };
  }
}