import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ValidationPipe implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Validate request body
    if (request.body) {
      this.validateObject(request.body);
    }
    
    // Validate query parameters
    if (request.query) {
      this.validateObject(request.query);
    }
    
    // Validate route parameters
    if (request.params) {
      this.validateObject(request.params);
    }
    
    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }

  private validateObject(obj: any): void {
    // Add your validation logic here
    // For now, we'll just check for required fields
    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined || obj[key] === null) {
        throw new Error(`Validation failed: ${key} is required`);
      }
    });
  }
}