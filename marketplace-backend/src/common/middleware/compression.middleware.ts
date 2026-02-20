import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // NOTE: We previously set Content-Encoding headers without actually
    // compressing the response body which caused clients (PowerShell curl)
    // to fail decoding. Remove the fake compression headers here. For a real
    // app use a proper compression middleware (e.g., `compression` package).
    next();
  }
}