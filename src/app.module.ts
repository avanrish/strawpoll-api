import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AppController } from './app.controller';
import { validationSchema } from './config/validation-schema';
import { appVariables, databaseVariables } from './config/variables';
import { PollModule } from './poll/poll.module';
import mikroOrmConfig from './config/mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      validationSchema,
      load: [appVariables, databaseVariables],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mikroOrmConfig,
      inject: [ConfigService],
    }),
    PollModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
