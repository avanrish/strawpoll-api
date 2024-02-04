import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AppController } from './app.controller';
import { PollsModule } from './polls/polls.module';
import { getConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
    }),
    MikroOrmModule.forRoot(),
    PollsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
