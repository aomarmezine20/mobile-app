import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly requestCounts = new Map();
  private readonly windowMs = 60 * 1000; // 1 minute
  private readonly maxRequests = 100;

  

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - this.windowMs;

    try {
      // Clean up old requests
      this.requestCounts.forEach((requests, key) => {
        this.requestCounts.set(
          key,
          requests.filter(([timestamp]) => timestamp > windowStart),
        );
      });

      // Get current requests for this IP
      const currentRequests = this.requestCounts.get(ip) || [];
      
      if (currentRequests.length >= this.maxRequests) {
        return res.status(429).json({
          statusCode: 429,
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Try again later.',
        });
      }

      // Add current request
      currentRequests.push([now, req.url]);
      this.requestCounts.set(ip, currentRequests);

      next();
    } catch (error) {
      next(error);
    }
  }
}