import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseDateEntity } from '../../common/entities/base-date.entity';
import { Poll } from './poll.entity';

@Entity()
export class PollOption extends BaseDateEntity {
  @Property()
  title!: string;

  @ManyToOne()
  poll!: Poll;
}
