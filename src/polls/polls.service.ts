import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/postgresql';

import { Poll, PollType } from './entities/poll.entity';
import { CreatePollDto } from './dto/create-poll.dto';
import { Error } from '../common/enums/error';
import { PollOption } from './entities/poll-option.entity';
import { PollVote } from './entities/poll-vote.entity';

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

  async hasVoted(poll: Poll, ip: string) {
    if (!poll.options.isInitialized()) await wrap(poll).init();
    let hasVoted = false;
    poll.options.getItems().forEach((option) => {
      if (!option.votes.isInitialized()) wrap(option.votes).init();
      option.votes.getItems().forEach((vote) => {
        if (vote.ipAddress === ip) hasVoted = true;
      });
    });
    return hasVoted;
  }

  vote(poll: Poll, optionIds: number[], ip: string) {
    let options: PollOption[] = [];
    if (poll.type === PollType.SINGLE_CHOICE) {
      const option = poll.options.find((option) => option.id === optionIds[0]);
      options.push(option);
    } else {
      options = poll.options.filter((option) => optionIds.includes(option.id));
    }
    options.forEach((option) => {
      const vote = new PollVote();
      vote.ipAddress = ip;
      option.votes.add(vote);
    });
  }
}
