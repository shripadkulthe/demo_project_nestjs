import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_CONFIG } from 'src/config/app.config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'APP_CONFIG',
      useFactory: async () => {
        
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return APP_CONFIG;
    },
  },
  ],
  exports: ['APP_CONFIG'], 
})
export class UserModule {}
