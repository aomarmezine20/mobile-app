import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { CorsMiddleware } from './common/middleware/cors.middleware';
import { SecurityMiddleware } from './common/middleware/security.middleware';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { CompressionMiddleware } from './common/middleware/compression.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Apply middleware
  app.use(RequestLoggerMiddleware);
  app.use(CorsMiddleware);
  app.use(SecurityMiddleware);
  app.use(RateLimitMiddleware);
  app.use(CompressionMiddleware);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
