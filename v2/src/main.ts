import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  PORT,
  CONNECT_SRC_URLS,
  FONTS_SRC_URLS,
  SCRIPTS_SRC_URLS,
  STYLES_SRC_URLS,
} from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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

  await app.listen(PORT);
}
bootstrap();
