import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { UserModule } from './user/user.module';
import { UserMiddleware } from './common/middleware/user.middleware';
import { ApiTokenCheckMiddleware } from './common/middleware/api-token-check.middleware';

@Module({
  imports: [UserModule],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
    consumer.apply(ApiTokenCheckMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
