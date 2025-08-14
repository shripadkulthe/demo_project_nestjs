import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // Strip properties not in DTO
    forbidNonWhitelisted: true, // Throw error if extra props are sent
    transform: true,       // Auto-transform payloads to correct types
  }));

  await app.listen(3000);
}
bootstrap();
