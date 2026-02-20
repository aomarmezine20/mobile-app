import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, url, headers, body } = req;

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;

      console.log(`[${new Date().toISOString()}] ${method} ${url} ${statusCode} ${duration}ms`);
      console.log('Headers:', headers);
      console.log('Body:', body);
    });

    next();
  }
}