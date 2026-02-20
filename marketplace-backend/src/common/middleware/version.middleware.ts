import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VersionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Add version information to response headers
    res.setHeader('X-API-Version', '1.0.0');
    res.setHeader('X-Powered-By', 'NestJS Marketplace Backend');
    
    next();
  }
}