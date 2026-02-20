import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      // Pass through to the next middleware/handler. Errors should be handled
      // by the global exception filter (`AllExceptionsFilter`) or by an
      // Express error handler registered separately.
      next();
    } catch (err: any) {
      console.error('Unhandled error (sync):', err);

      const errorResponse = {
        statusCode: err?.status || 500,
        timestamp: new Date().toISOString(),
        path: req.url,
        method: req.method,
        error: err?.name || 'Internal Server Error',
        message: err?.message || 'An unexpected error occurred',
        ...(process.env.NODE_ENV === 'development' && { stack: err?.stack }),
      };

      try {
        res.status(err?.status || 500).json(errorResponse);
      } catch (sendErr) {
        // If sending the error response fails, there's not much we can do.
        console.error('Failed to send error response:', sendErr);
      }
    }
  }
}