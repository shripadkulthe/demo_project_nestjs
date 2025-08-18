import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //app.useGlobalPipes(new ValidationPipe({
   // whitelist: true,       
    
  //  transform: true,       // Auto-transform payloads to correct types
 //}));

  await app.listen(3000);
}
bootstrap();
