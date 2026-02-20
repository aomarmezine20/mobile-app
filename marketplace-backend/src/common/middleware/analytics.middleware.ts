import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AnalyticsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Track request analytics
    const analyticsData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      headers: req.headers,
    };

    // Log analytics data
    console.log('Analytics:', analyticsData);

    next();
  }
}