import { Migration } from '@mikro-orm/migrations';

export class Migration20230905173000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "poll" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, constraint "poll_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "poll_option" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "poll_id" uuid not null);',
    );

    this.addSql(
      'alter table "poll_option" add constraint "poll_option_poll_id_foreign" foreign key ("poll_id") references "poll" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "poll_option" drop constraint "poll_option_poll_id_foreign";',
    );

    this.addSql('drop table if exists "poll" cascade;');

    this.addSql('drop table if exists "poll_option" cascade;');
  }
}
