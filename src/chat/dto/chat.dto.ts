import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class ChatDto {
  @IsString()
  @IsNotEmpty({ message: 'Message cannot be empty' })
  @MaxLength(200, { message: 'Message cannot exceed 200 characters' })
  text!: string;

  @IsString()
  @IsNotEmpty({ message: 'Room is required' })
  room!: string;
}