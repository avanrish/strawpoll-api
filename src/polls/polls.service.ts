import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Poll } from './entities/poll.entity';
import { CreatePollDto } from './dto/create-poll.dto';
import { Error } from '../common/enums/error';

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

  findPollOrFail(publicId: string) {
    return this.pollRepository.findOneOrFail(
      { publicId },
      {
        populate: ['options', 'options.votes'],
        failHandler: () => new NotFoundException([Error.PollNotFound]),
      },
    );
  }
}
