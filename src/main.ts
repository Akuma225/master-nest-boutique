import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.APP_PORT);

  const appURL = await app.getUrl()

  Logger.log(`${process.env.APP_NAME} ${process.env.APP_VERSION} is running on ${appURL}`)
}
bootstrap();
