import { IsString, IsEmail, MinLength, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUser1Dto {
  @ApiProperty({ example: 'Shripad Kulthe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'shripadkulthe1205@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'admin', enum: ['admin', 'user'] })
  @IsString()
  @IsIn(['admin', 'user'])
  type: string;

  @ApiProperty({ example: 'shri1205', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
