import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AppController } from './app.controller';
import { PollModule } from './poll/poll.module';
import { getConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
    }),
    MikroOrmModule.forRoot(),
    PollModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
