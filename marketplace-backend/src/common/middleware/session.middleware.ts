import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface Session {
  id: string;
  createdAt: Date;
  lastActivity: Date;
  data: Record<string, any>;
}

interface ExtendedRequest extends Request {
  session?: Session;
}

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    // Initialize session
    if (!req.session) {
      (req as any).session = {
        id: Date.now().toString(),
        createdAt: new Date(),
        lastActivity: new Date(),
        data: {},
      };
    }

    // Update last activity
    (req as any).session.lastActivity = new Date();

    next();
  }
}