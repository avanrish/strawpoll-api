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

@Entity()
export class PollOption extends BaseDateEntity {
  @Property()
  title!: string;

  @ManyToOne()
  poll!: Poll;

  @OneToMany(() => PollVote, (vote) => vote.option)
  votes = new Collection<PollVote>(this);
}
