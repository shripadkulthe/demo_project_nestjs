import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {

  @ApiProperty({
  example: 1,
})
  @IsNumber()
  userId!: number;
}
