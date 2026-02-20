import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {
  private maintenanceMode = false;

  use(req: Request, res: Response, next: NextFunction) {
    if (this.maintenanceMode) {
      return res.status(503).json({
        statusCode: 503,
        error: 'Service Unavailable',
        message: 'The service is currently under maintenance. Please try again later.',
        timestamp: new Date().toISOString(),
      });
    }

    next();
  }

  enableMaintenance() {
    this.maintenanceMode = true;
  }

  disableMaintenance() {
    this.maintenanceMode = false;
  }
}