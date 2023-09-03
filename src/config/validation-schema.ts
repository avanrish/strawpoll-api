import * as Joi from 'joi';

import { Environment } from '../common/enums/environment';
import { defaultPort } from './app.config';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.Development),
  PORT: Joi.number().default(defaultPort),
});
