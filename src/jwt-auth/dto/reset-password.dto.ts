import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {

  @ApiProperty({
  example: 'reset_token',
})
  @IsString()
  @IsNotEmpty()
  token!: string;

  @ApiProperty({
  example: 'newpassword123',
})
  @IsString()
  @MinLength(6)
  newPassword!: string;
}
