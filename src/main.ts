import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* 
    the code below is responsible to make validations under the payload
    that is using class-validators (file inside the dto folder)
  */
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3020);
}
bootstrap();
