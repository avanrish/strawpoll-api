import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Poll } from './entities/poll.entity';
import { CreatePollDto } from './dto/create-poll.dto';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollRepository: EntityRepository<Poll>,
  ) {}

  createPoll(dto: CreatePollDto) {
    const { title, type, options } = dto;
    return this.pollRepository.create({
      title,
      type,
      options: options.map((option) => ({ title: option })),
    });
  }
}
