import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { UserModule } from './user/user.module';
import { UserMiddleware } from './common/middleware/user.middleware';
//import { ApiTokenCheckMiddleware } from './common/middleware/api-token-check.middleware';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ScopesModule } from './common/scopes/scopes.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User1Module } from './user1/user1.module';
import { AuthModule } from './user1/auth/auth.module'; 


@Module({
  imports: [UserModule,
  ...(process.env.LOAD_ADMIN === 'true' ? [AdminModule.forRoot()] : []),
  ScopesModule,DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '12345',
      database: 'testdb',
    }), ConfigModule.forRoot({
      folder: './configs',  
    }),
  MongooseModule.forRoot('mongodb://localhost:27017/demoProjectNestjs'),
User1Module,AuthModule,
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