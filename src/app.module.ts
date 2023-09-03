import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { validationSchema } from './config/validation-schema';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      validationSchema,
      load: [appConfig],
    }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
