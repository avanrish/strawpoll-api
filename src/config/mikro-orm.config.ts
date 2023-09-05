import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { config } from 'dotenv';

export const envFileName = '.env.local';
config({ path: `${process.cwd()}/${envFileName}` });

const mikroOrmOptions: MikroOrmModuleSyncOptions = {
  metadataProvider: TsMorphMetadataProvider,
  entities: ['dist/**/*.entity{.ts,.js}'],
  entitiesTs: ['src/**/*.entity{.ts,.js}'],
  driver: PostgreSqlDriver,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD || '',
  dbName: process.env.POSTGRES_DB,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    generator: TSMigrationGenerator,
  },
};

export default mikroOrmOptions;
