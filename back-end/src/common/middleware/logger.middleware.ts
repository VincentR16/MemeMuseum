import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/authenticatedRequest.types';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP REQUEST');

  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();

    const authenticatedReq = req as AuthenticatedRequest;

    res.on('finish', () => {
      const durationMs = Date.now() - start;

      const event = {
        type: 'http_request',
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl || req.url,
        status: res.statusCode,
        duration_ms: durationMs,
        ip: req.ip,
        user_agent: req.get('user-agent') || '',
        user: authenticatedReq.user?.userId ?? 'anonymous',
        role: authenticatedReq.user?.role ?? undefined,
        app: 'webapp-backend',
      };

      const consoleMsg = `endpoint:${req.method} ${event.path} statusCode:${res.statusCode} ip:${req.ip} user:${event.user} (${durationMs}ms)`;
      this.logger.log(consoleMsg);
    });

    next();
  }
}
