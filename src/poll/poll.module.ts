import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { PollOption } from './entities/poll-option.entity';
import { Poll } from './entities/poll.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Poll, PollOption])],
  controllers: [PollController],
  providers: [PollService],
})
export class PollModule {}
