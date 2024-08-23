import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigins = process.env.CORS_ORIGINS
    ? Array.from(
        new Set(
          process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()),
        ),
      )
    : [];

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  if (corsOrigins.length > 0) {
    app.enableCors({
      origin: corsOrigins,
      credentials: true,
    });
  }

  await app.listen(3001);
}
bootstrap();
