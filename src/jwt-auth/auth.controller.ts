import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ApiTags, ApiOperation, ApiBody,ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('JWT Authentication')
@Controller('jwt-auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
  summary: 'Generate access and refresh tokens',
 })
  @Get('login')
  login() {
    return this.authService.login();
  }

  @ApiOperation({
  summary: 'Generate new access token using refresh token',
})

  @ApiBody({ type: RefreshTokenDto })
  @Post('refresh')
  refresh(
    @Body()
    body: RefreshTokenDto,
  ) {
    return this.authService.refreshToken(body.refresh_token);
  }

  @ApiOperation({
  summary: 'Logout user and revoke refresh token',
  })
  @ApiBody({ type: LogoutDto })
  @Post('logout')
  logout(@Body() body: LogoutDto) {
    return this.authService.logout(body.userId);
  }

  @ApiOperation({
  summary: 'Send password reset token',
})

  @ApiBody({ type: ForgotPasswordDto })
  @Post('forgot-password')
  forgotPassword(
  @Body() body: ForgotPasswordDto,
  ) {
  return this.authService.forgotPassword(body.email);
  }

  @ApiOperation({
  summary: 'Reset user password using token',
})
@ApiBody({ type: ResetPasswordDto })
  @Post('reset-password')
resetPassword(
  @Body() body: ResetPasswordDto,
) {
  return this.authService.resetPassword(
    body.token,
    body.newPassword,
  );
}

  @ApiOperation({
  summary: 'Register new user',
})
  @Post('register')
register() {
  return this.authService.register();
}

@ApiOperation({
  summary: 'Verify user email using token',
})
@ApiBody({ type: VerifyEmailDto })
@Post('verify-email')
verifyEmail(
  @Body() body: VerifyEmailDto,
) {
  return this.authService.verifyEmail(
    body.token,
  );
}

  @ApiBearerAuth()
@ApiOperation({
  summary: 'Access protected admin profile route',
})
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
