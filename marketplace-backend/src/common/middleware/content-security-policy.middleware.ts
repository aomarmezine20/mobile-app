import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ContentSecurityPolicyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set Content Security Policy headers
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'none'; object-src 'none';"
    );
    
    next();
  }
}