import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import {
  CONNECT_SRC_URLS,
  FONTS_SRC_URLS,
  SCRIPTS_SRC_URLS,
  STYLES_SRC_URLS,
} from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*',
    credentials: false,
  });
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [],
          connectSrc: ["'self'", ...CONNECT_SRC_URLS],
          scriptSrc: ["'unsafe-inline'", "'self'", ...SCRIPTS_SRC_URLS],
          styleSrc: ["'self'", "'unsafe-inline'", ...STYLES_SRC_URLS],
          workerSrc: ["'self'", 'blob:'],
          objectSrc: [],
          imgSrc: ["'self'", 'blob:', 'data:', 'https://images.unsplash.com/'],
          fontSrc: ["'self'", ...FONTS_SRC_URLS],
        },
      },
    }),
  );
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  await app.listen(configService.get('port'));
}
bootstrap();
