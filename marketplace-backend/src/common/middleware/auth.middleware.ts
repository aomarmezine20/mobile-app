import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../database/prisma/prisma.service';

interface CustomRequest extends Request {
  user?: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return next(new UnauthorizedException('No token provided'));
    }

    try {
      const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
      
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
        },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid token or user inactive');
      }

      req.user = user;
      next();
    } catch (error) {
      next(new UnauthorizedException('Invalid token'));
    }
  }
}