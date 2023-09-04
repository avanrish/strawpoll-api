import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Poll {
  @PrimaryKey()
  id!: number;
}
