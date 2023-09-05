import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AppController } from './app.controller';
import { validationSchema } from './config/validation-schema';
import { PollModule } from './poll/poll.module';
import appVariables from './config/app.variables';
import mikroOrmConfig, { envFileName } from './config/mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFileName,
      isGlobal: true,
      validationSchema,
      load: [appVariables],
    }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    PollModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
