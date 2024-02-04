import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
  Enum,
} from '@mikro-orm/core';

import { BaseDateEntity } from '../../common/entities/base-date.entity';
import { PollOption } from './poll-option.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Poll extends BaseDateEntity {
  @Property({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  @Unique()
  publicId!: string;

  @Property()
  title!: string;

  @Enum(() => PollType)
  type!: PollType;

  @ApiProperty({ type: PollOption, example: PollOption.example })
  @OneToMany(() => PollOption, (option) => option.poll, { eager: true })
  options = new Collection<PollOption>(this);
}

export enum PollType {
  SINGLE_CHOICE = 'single_choice',
  MULTIPLE_CHOICE = 'multiple_choice',
}
