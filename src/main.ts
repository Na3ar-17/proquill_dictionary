import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  await app.listen(4200);
}
bootstrap();
