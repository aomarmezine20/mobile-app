import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GzipMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Enable gzip compression
    if (req.headers['accept-encoding'] && req.headers['accept-encoding'].includes('gzip')) {
      res.setHeader('Content-Encoding', 'gzip');
      res.setHeader('Vary', 'Accept-Encoding');
    }
    
    next();
  }
}