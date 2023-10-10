import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

import { getConfig } from './app.config';
import { Environment } from '../common/enums/environment';

const { db, env } = getConfig();

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
  driverOptions: {
    connection: {
      ssl: env === Environment.Local ? false : { ca: db.cert },
    },
  },
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    generator: TSMigrationGenerator,
    disableForeignKeys: false,
  },
};

export default mikroOrmOptions;
