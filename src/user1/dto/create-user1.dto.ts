import { IsString, IsEmail, MinLength, IsIn } from 'class-validator';

export class CreateUser1Dto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['admin', 'user'])  
  type: string;

  @IsString()
  @MinLength(6)   
  password: string;
}
