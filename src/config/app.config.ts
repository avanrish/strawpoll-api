import { Environment } from '../common/enums/environment';
import { AppConfig } from './types';
import { appConfigSchema } from './app-config-schema';

const defaultPort = 4000;

export const getConfig = (): AppConfig =>
  appConfigSchema.parse({
    env: process.env.APP_ENV as Environment,
    port: parseInt(process.env.PORT, 10) || defaultPort,
    db: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      name: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      host: process.env.POSTGRES_HOST,
      cert: process.env.POSTGRES_CERT,
    },
  });
