import { IsString ,MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserDto {

    @Transform(({ value }) => 
    {
        if (value === "Shripad") return "Kulthe";
        return value;
    })
    @MinLength(3)
    @IsString()
  name: string;

  @IsString()
  type: string;
}