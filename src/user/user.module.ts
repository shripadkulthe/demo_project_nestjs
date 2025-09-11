import { Module,forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { APP_CONFIG } from 'src/config/app.config';

@Module({
  imports: [forwardRef(() => AuthModule)],
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
  exports: ['APP_CONFIG', UserService], 
})
export class UserModule {}