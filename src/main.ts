import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/user1/filters/http-exception.filter';
import { WsAdapter } from './chat/adapters/ws-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useWebSocketAdapter(new WsAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my Demo NestJS project')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

   app.useGlobalFilters(new AllExceptionsFilter());
   
  app.useGlobalPipes(new ValidationPipe({
    //whitelist: true,       
    
    transform: true,       
 }));

 app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
