import { IsString, MinLength, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserDto {
  @Transform(({ value }) => {
    if (value === "Shripad") return "Kulthe";
    return value;
  })
  @MinLength(3)
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  password: string; 
}