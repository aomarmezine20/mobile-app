import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Generate unique request ID
    const requestId = Math.random().toString(36).substr(2, 9);
    
    // Add request ID to headers
    req.headers['x-request-id'] = requestId;
    res.setHeader('X-Request-Id', requestId);
    
    next();
  }
}