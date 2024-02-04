import { Body, Controller, Post } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { ApiTags } from '@nestjs/swagger';

import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';

import { Poll } from './entities/poll.entity';
import { ResultDto } from '../common/dto/result.dto';
import { ApiResult } from '../common/decorators/api-result';

@ApiResult(Poll)
@ApiTags('polls')
@Controller('polls')
export class PollsController {
  constructor(
    private readonly em: EntityManager,
    private readonly pollsService: PollsService,
  ) {}

  @Post()
  async createPoll(@Body() dto: CreatePollDto): Promise<ResultDto<Poll>> {
    const poll = this.pollsService.createPoll(dto);
    await this.em.flush();
    return { result: poll };
  }
}
