import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    exposedHeaders: 'set-cookie',
    origin: process.env.SITE_URL,
  });

  await app.listen(4200);
}
bootstrap();
