import { Migration } from '@mikro-orm/migrations';

export class Migration20230919172954 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "poll" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "public_id" uuid not null default uuid_generate_v4(), "title" varchar(255) not null);',
    );
    this.addSql(
      'alter table "poll" add constraint "poll_public_id_unique" unique ("public_id");',
    );

    this.addSql(
      'create table "poll_option" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "poll_id" int not null);',
    );

    this.addSql(
      'alter table "poll_option" add constraint "poll_option_poll_id_foreign" foreign key ("poll_id") references "poll" ("id") on update cascade;',
    );
  }
}
