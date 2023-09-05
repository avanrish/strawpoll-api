import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

import { DateEntity } from '../../common/entities/date.entity';
import { Poll } from './poll.entity';

@Entity()
export class PollOption extends DateEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @ManyToOne()
  poll!: Poll;
}
