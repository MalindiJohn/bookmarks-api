import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //global pipe for validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove not defined fields in dto
    }),
  );

  await app.listen(3000);
}
bootstrap();
