import { z } from 'zod';

import { Environment } from '../common/enums/environment';

export const appConfigSchema = z.object({
  env: z.nativeEnum(Environment),
  port: z.number().int().positive(),
  db: z.object({
    user: z.string().trim().min(1),
    password: z.string().trim().min(1),
    name: z.string().trim().min(1),
    port: z.number().int().positive(),
    host: z.string().trim().min(1),
    cert: z.string().optional(),
    testDbName: z.string().trim().min(1),
  }),
});
