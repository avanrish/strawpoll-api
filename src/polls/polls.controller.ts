import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { ApiTags } from '@nestjs/swagger';

import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { Poll } from './entities/poll.entity';
import { ResultDto } from '../common/dto/result.dto';
import { ApiResult } from '../common/decorators/api-result';

@ApiTags('polls')
@Controller('polls')
export class PollsController {
  constructor(
    private readonly em: EntityManager,
    private readonly pollsService: PollsService,
  ) {}

  @ApiResult(Poll)
  @Post()
  async createPoll(@Body() dto: CreatePollDto): Promise<ResultDto<Poll>> {
    const poll = this.pollsService.createPoll(dto);
    await this.em.flush();
    return { result: poll };
  }

  @ApiResult(Poll)
  @Get(':publicId')
  async getPoll(@Param('publicId') publicId: string): Promise<ResultDto<Poll>> {
    const poll = await this.pollsService.findPollOrFail(publicId);
    return { result: poll };
  }
}
