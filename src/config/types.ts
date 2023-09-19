import { z } from 'zod';

import { appConfigSchema } from './app-config-schema';

export type AppConfig = z.infer<typeof appConfigSchema>;
