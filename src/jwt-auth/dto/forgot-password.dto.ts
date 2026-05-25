import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {

  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsEmail()
  email!: string;
}
