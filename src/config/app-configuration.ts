import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export default (): ConfigModuleOptions => ({
  envFilePath: '.env.local',
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'staging', 'production')
      .default('development'),
    PORT: Joi.number().default(4000),
  }),
});
