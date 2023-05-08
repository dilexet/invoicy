import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './database/data-source';

async function bootstrap() {
  dataSource
    .initialize()
    .then(async () => {
      const app = await NestFactory.create(AppModule);
      await app.listen(3000);
    })
    .catch((error) => console.log(error));
}

bootstrap();
