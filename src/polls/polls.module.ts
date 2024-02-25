import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { PollOption } from './entities/poll-option.entity';
import { Poll } from './entities/poll.entity';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [MikroOrmModule.forFeature([Poll, PollOption]), GatewayModule],
  controllers: [PollsController],
  providers: [PollsService],
  exports: [PollsService],
})
export class PollsModule {}
