import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { ApiTags } from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';

import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { Poll, PollType } from './entities/poll.entity';
import { ResultDto } from '../common/dto/result.dto';
import { ApiResult } from '../common/decorators/api-result';
import { VoteDto } from './dto/vote.dto';
import { Error } from '../common/enums/error';
import { PollOption } from './entities/poll-option.entity';

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

  @ApiResult(Poll)
  @Post(':publicId/vote')
  async vote(
    @Param('publicId') publicId: string,
    @Body() dto: VoteDto,
    @RealIP() ip: string,
  ): Promise<ResultDto<Poll>> {
    const poll = await this.pollsService.findPollOrFail(publicId);
    const hasVoted = await this.pollsService.hasVoted(poll, ip);
    if (hasVoted) throw new ConflictException([Error.AlreadyVoted]);
    this.pollsService.vote(poll, dto.optionIds, ip);
    await this.em.flush();
    return { result: poll };
  }
}
