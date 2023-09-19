import { z } from 'zod';

import { Environment } from '../common/enums/environment';

export const appConfigSchema = z.object({
  env: z.nativeEnum(Environment),
  port: z.number().int().positive(),
  db: z.object({
    user: z.string().nonempty(),
    password: z.string().nonempty(),
    name: z.string().nonempty(),
    port: z.number().int().positive(),
    host: z.string().nonempty(),
  }),
});
