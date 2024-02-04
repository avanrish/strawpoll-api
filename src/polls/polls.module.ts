import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { PollOption } from './entities/poll-option.entity';
import { Poll } from './entities/poll.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Poll, PollOption])],
  controllers: [PollsController],
  providers: [PollsService],
})
export class PollsModule {}
