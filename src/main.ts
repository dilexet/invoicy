import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './database/data-source';
import * as process from 'process';

async function bootstrap() {
  dataSource
    .initialize()
    .then(async () => {
      const app = await NestFactory.create(AppModule);
      console.log();
      await app.listen(process.env.PORT, process.env.HOST, () => {
        console.log(
          `Server started on http://${process.env.HOST}:${process.env.PORT}/`,
        );
      });
    })
    .catch((error) => console.log(error));
}

bootstrap();
