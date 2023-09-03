import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

const nestLogger = new Logger('Request');

export function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? 'error' : 'log';
    nestLogger[level](
      `[${req.method}] ${req.originalUrl} - ${res.statusCode} - ${duration}ms`,
    );
    if (res.statusMessage && level === 'error')
      nestLogger[level](`Message: ${res.statusMessage}`);
  });
  next();
}
