import { Environment } from '../common/enums/environment';

export const defaultPort = 4000;

export default () => ({
  env: process.env.NODE_ENV || Environment.Development,
  port: parseInt(process.env.PORT, 10) || defaultPort,
});
