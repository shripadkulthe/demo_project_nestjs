import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import appConfig from 'src/config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { GetAllUsersHandler } from './queries/handlers/get-all-user.handler';
import { GetUserByIdHandler } from './queries/handlers/get-user-by-id.query';
import { UserCreatedHandler } from './events/handlers/user-created.handler';

const CommandHandlers = [CreateUserHandler];
const QueryHandlers = [
  GetAllUsersHandler,
  GetUserByIdHandler,
];

const EventHandlers = [UserCreatedHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,

    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
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
