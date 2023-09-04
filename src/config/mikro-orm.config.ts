import { ConfigService } from '@nestjs/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default (configService: ConfigService): MikroOrmModuleOptions => ({
  metadataProvider: TsMorphMetadataProvider,
  entities: ['dist/**/*.entity{.ts,.js}'],
  entitiesTs: ['src/**/*.entity{.ts,.js}'],
  driver: PostgreSqlDriver,
  dbName: configService.get<string>('postgres.dbName'),
  port: configService.get<number>('postgres.port'),
  host: configService.get<string>('postgres.host'),
  user: configService.get<string>('postgres.user'),
  password: configService.get<string>('postgres.password'),
});
