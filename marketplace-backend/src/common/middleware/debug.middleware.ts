import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Request as ExpressRequest } from 'express';

interface CustomRequest extends ExpressRequest {
  debug?: boolean;
}

@Injectable()
export class DebugMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    // Enable debug mode for development
    if (process.env.NODE_ENV === 'development') {
      req.debug = true;
      res.setHeader('X-Debug-Mode', 'enabled');
    }
    
    next();
  }
}