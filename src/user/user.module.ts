import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ExcludeFieldsInterceptor } from 'src/interceptors/exclude-fields.interceptor';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'APP_INTERCEPTOR', 
      useClass: ExcludeFieldsInterceptor,
    },
  ],
})
export class UserModule {}