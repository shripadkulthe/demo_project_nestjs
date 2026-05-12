import { Module,forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import appConfig from 'src/config/app.config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'APP_CONFIG',
      useFactory: async () => {
        
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return appConfig();
    },
  },
  ],
  exports: ['APP_CONFIG', UserService], 
})
export class UserModule {}