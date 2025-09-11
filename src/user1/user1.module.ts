import { Module } from '@nestjs/common';
import { User1Service } from './user1.service';
import { User1Controller } from './user1.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User1, User1Schema } from './schemas/user1.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User1.name, schema: User1Schema }])
  ],
  controllers: [User1Controller],
  providers: [User1Service],
  exports: [User1Service],
})
export class User1Module {}
