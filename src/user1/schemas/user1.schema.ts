import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type User1Document = User1 & Document;

@Schema({ collection: 'users' })
export class User1 {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  type: string;

  @Prop()
  password: string;
}

export const User1Schema = SchemaFactory.createForClass(User1);
