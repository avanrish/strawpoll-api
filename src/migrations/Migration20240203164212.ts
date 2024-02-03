import { Migration } from '@mikro-orm/migrations';

export class Migration20240203164212 extends Migration {
  async up(): Promise<void> {
    this.addSql('create extension if not exists "uuid-ossp";');
    this.addSql(
      'create table "poll" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "public_id" uuid not null default uuid_generate_v4(), "title" varchar(255) not null, "type" text check ("type" in (\'single_choice\', \'multiple_choice\')) not null);',
    );
    this.addSql(
      'alter table "poll" add constraint "poll_public_id_unique" unique ("public_id");',
    );

    this.addSql(
      'create table "poll_option" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "poll_id" int not null);',
    );

    this.addSql(
      'create table "poll_vote" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "option_id" int not null, "ip_address" varchar(255) not null);',
    );

    this.addSql(
      'alter table "poll_option" add constraint "poll_option_poll_id_foreign" foreign key ("poll_id") references "poll" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "poll_vote" add constraint "poll_vote_option_id_foreign" foreign key ("option_id") references "poll_option" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "poll_option" drop constraint "poll_option_poll_id_foreign";',
    );

    this.addSql(
      'alter table "poll_vote" drop constraint "poll_vote_option_id_foreign";',
    );

    this.addSql('drop table if exists "poll" cascade;');

    this.addSql('drop table if exists "poll_option" cascade;');

    this.addSql('drop table if exists "poll_vote" cascade;');

    this.addSql('drop extension if exists "uuid-ossp";');
  }
}
