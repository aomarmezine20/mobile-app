import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LocalizationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set default language
    const defaultLanguage = 'en';
    
    // Get language from headers or query
    const language = req.headers['accept-language'] || req.query.lang || defaultLanguage;
    
    // Set locale
    (req as any).locale = language;
    
    next();
  }
}