import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from '@/app.module';
import shouldCompress from '@/common/middleware/compress';
import { helmetConfigOptions, corsConfig } from '@/config/app/third-party';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsConfig);
  app.use(compression({ filter: shouldCompress }));
  app.use(helmet(helmetConfigOptions));
  await app.listen(process.env.PORT || 8080);
}

bootstrap()
  .then(() => console.log('Bootstrap success'))
  .catch((err) => console.error('Bootstrap error', err));
