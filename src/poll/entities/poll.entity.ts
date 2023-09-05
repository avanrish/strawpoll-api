import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { DateEntity } from '../../common/entities/date.entity';
import { PollOption } from './poll-option.entity';

@Entity()
export class Poll extends DateEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property()
  title!: string;

  @OneToMany(() => PollOption, (option) => option.poll)
  options = new Collection<PollOption>(this);
}
