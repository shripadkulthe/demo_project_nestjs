import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { UserModule } from './user/user.module';
import { UserMiddleware } from './common/middleware/user.middleware';
//import { ApiTokenCheckMiddleware } from './common/middleware/api-token-check.middleware';
import { DatabaseModule } from './database/database.module';
import { ScopesModule } from './common/scopes/scopes.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User1Module } from './user1/user1.module';
import { AuthModule } from './user1/auth/auth.module'; 
import { UploadModule } from 'src/user1/uploads/upload.module';
import { ChatModule } from './chat/chat.module';
import { GatewayExplorerModule } from './chat/discovery/gateway-explorer.module';
import { JWTAuthModule } from './jwt-auth/jwt-auth.module';

@Module({
  imports: [

  ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig],
  }),

  UserModule,

  ChatModule.forRootAsync({
    inject: [ConfigService],

    useFactory: async (
    configService: ConfigService,
    ) => ({
      bannedRooms:
        configService.get<string[]>(
          'chat.bannedRooms',
        ) || [],
      }),
    }),

GatewayExplorerModule,
  ...(process.env.LOAD_ADMIN === 'true' ? [AdminModule.forRoot()] : []),
  ScopesModule,DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '12345',
      database: 'testdb',
    }),
  MongooseModule.forRoot('mongodb://localhost:27017/demoProjectNestjs'),
User1Module,AuthModule,UploadModule,JWTAuthModule
],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
    //consumer.apply(ApiTokenCheckMiddleware)
     // .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}