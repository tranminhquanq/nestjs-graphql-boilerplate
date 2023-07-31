import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from '@/app.module';
import { corsConfig } from '@/config/app/cors';
import shouldCompress from '@/common/middleware/compress';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsConfig);
  app.use(compression({ filter: shouldCompress }));
  app.use(helmet());
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

bootstrap()
  .then(() => console.log('Bootstrap success'))
  .catch((err) => console.error('Bootstrap error', err));
