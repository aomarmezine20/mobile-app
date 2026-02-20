import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set timeout for requests
    const timeout = setTimeout(() => {
      res.status(504).json({
        statusCode: 504,
        error: 'Gateway Timeout',
        message: 'Request timeout. Please try again.',
        timestamp: new Date().toISOString(),
      });
    }, 30000); // 30 seconds timeout

    // Clear timeout if response is sent
    res.on('finish', () => clearTimeout(timeout));
    res.on('close', () => clearTimeout(timeout));

    next();
  }
}