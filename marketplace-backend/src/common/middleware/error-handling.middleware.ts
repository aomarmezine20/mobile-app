import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
  use(err: any, req: Request, res: Response, next: NextFunction) {
    if (err) {
      console.error('Unhandled error:', err);
      
      const errorResponse = {
        statusCode: err.status || 500,
        timestamp: new Date().toISOString(),
        path: req.url,
        method: req.method,
        error: err.name || 'Internal Server Error',
        message: err.message || 'An unexpected error occurred',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      };

      res.status(err.status || 500).json(errorResponse);
    } else {
      next();
    }
  }
}