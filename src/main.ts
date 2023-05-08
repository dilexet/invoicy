import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get<string>('SWAGGER_TITLE'))
    .setDescription(config.get<string>('SWAGGER_DESCRIPTION'))
    .setVersion(config.get<string>('SWAGGER_VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(config.get<string>('SWAGGER_PATH'), app, document);

  await app.listen(
    config.get<number>('PORT'),
    config.get<string>('HOST'),
    () => {
      console.log(
        `Server started on http://${config.get<string>(
          'HOST',
        )}:${config.get<number>('PORT')}/${config.get<number>(
          'SWAGGER_PATH',
        )}`,
      );
    },
  );
}

bootstrap();
