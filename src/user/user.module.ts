import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ExcludeFieldsInterceptor } from 'src/interceptors/exclude-fields.interceptor';

@Module({
  controllers: [UserController],
  providers: [
    UserService],
})
export class UserModule {}