import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('jwt-auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login() {
    return this.authService.login();
  }

  @Post('refresh')
  refresh(
    @Body()
    body: RefreshTokenDto,
  ) {
    return this.authService.refreshToken(body.refresh_token);
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
