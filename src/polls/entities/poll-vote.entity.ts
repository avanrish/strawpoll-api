import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseDateEntity } from '../../common/entities/base-date.entity';
import { PollOption } from './poll-option.entity';

@Entity()
export class PollVote extends BaseDateEntity {
  @ManyToOne()
  option!: PollOption;

  @Property()
  ipAddress!: string;
}
