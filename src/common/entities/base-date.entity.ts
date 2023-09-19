import { BaseEntity, PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseDateEntity extends BaseEntity<BaseDateEntity, 'id'> {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
