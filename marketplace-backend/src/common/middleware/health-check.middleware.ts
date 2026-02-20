import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HealthCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Health check endpoint
    if (req.path === '/health') {
      return res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
      });
    }

    next();
  }
}