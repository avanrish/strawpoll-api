import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { MikroORM } from '@mikro-orm/core';

import { AppModule } from './app.module';
import { logger } from './logging.middleware';
import { AppConfig } from './config/types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('v1', {
    exclude: [''],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );
  app.use(logger);

  const config = new DocumentBuilder()
    .setTitle('StrawPoll')
    .setDescription('StrawPoll API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const configService: ConfigService<AppConfig> = app.get(ConfigService);
  const orm = app.get(MikroORM);
  await orm.migrator.up();

  await app.listen(configService.get('port'));
}
bootstrap().catch((err) => {
  console.log(err);
});
