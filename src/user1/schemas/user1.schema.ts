import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type User1Document = User1 & Document;

@Schema({timestamps: true})
export class User1 {
   _id: Types.ObjectId;
   
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })  
  type: string;

  @Prop({ type: String, default: null })
  refreshToken: string | null;
}

export const User1Schema = SchemaFactory.createForClass(User1);
