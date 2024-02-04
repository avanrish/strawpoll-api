import { Test, TestingModule } from '@nestjs/testing';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { Poll, PollType } from './entities/poll.entity';
import mikroOrmConfig from '../config/mikro-orm.config';

describe('PollsController', () => {
  let controller: PollsController;
  let orm: MikroORM;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...mikroOrmConfig,
          dbName: 'strawpoll-mikro-test-db',
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature({ entities: [Poll] }),
      ],
      controllers: [PollsController],
      providers: [PollsService],
    }).compile();

    controller = module.get<PollsController>(PollsController);
    orm = module.get(MikroORM);
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => await orm.close(true));

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a poll', async () => {
    const poll = await controller.createPoll({
      title: 'Test Poll',
      type: PollType.SINGLE_CHOICE,
      options: ['Option 1', 'Option 2'],
    });

    expect(poll.result.title).toBe('Test Poll');
    expect(poll.result.type).toBe(PollType.SINGLE_CHOICE);
    expect(poll.result.options).toHaveLength(2);
    expect(poll.result.options[0].title).toBe('Option 1');
    expect(poll.result.options[1].title).toBe('Option 2');
  });
});
