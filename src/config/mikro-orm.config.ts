import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

import { getConfig } from './app.config';

const { db } = getConfig();

const mikroOrmOptions: MikroOrmModuleSyncOptions = {
  metadataProvider: TsMorphMetadataProvider,
  entities: ['dist/**/*.entity{.ts,.js}'],
  entitiesTs: ['src/**/*.entity{.ts,.js}'],
  driver: PostgreSqlDriver,
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  dbName: db.name,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    generator: TSMigrationGenerator,
  },
};

export default mikroOrmOptions;
