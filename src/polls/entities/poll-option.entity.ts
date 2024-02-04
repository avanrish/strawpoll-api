import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';

import { BaseDateEntity } from '../../common/entities/base-date.entity';
import { Poll } from './poll.entity';
import { PollVote } from './poll-vote.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class PollOption extends BaseDateEntity {
  @Property()
  title!: string;

  @ApiHideProperty()
  @ManyToOne(() => Poll, { hidden: true })
  poll!: Poll;

  @ApiHideProperty()
  @OneToMany(() => PollVote, (vote) => vote.option, { hidden: true })
  votes = new Collection<PollVote>(this);

  @Property({ persist: false })
  get count() {
    return this.votes.count();
  }

  static example: Omit<PollOption, 'poll' | 'votes'> = {
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'string',
    count: 0,
  };
}
