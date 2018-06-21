import { FastifyAdapter, NestFactory } from '@nestjs/core';
import { main } from '../settings';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, new FastifyAdapter());
  await app.listen(main.port);
}
bootstrap();
