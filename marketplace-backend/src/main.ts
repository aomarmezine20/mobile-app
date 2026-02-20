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
  
  // Apply middleware instances (class-based Nest middleware must be applied
  // as functions when using the raw Express `app.use`)
  const requestLogger = new RequestLoggerMiddleware();
  const corsMiddleware = new CorsMiddleware();
  const securityMiddleware = new SecurityMiddleware();
  const rateLimitMiddleware = new RateLimitMiddleware();
  const compressionMiddleware = new CompressionMiddleware();

  app.use((req, res, next) => requestLogger.use(req, res, next));
  app.use((req, res, next) => corsMiddleware.use(req, res, next));
  app.use((req, res, next) => securityMiddleware.use(req, res, next));
  app.use((req, res, next) => rateLimitMiddleware.use(req, res, next));
  app.use((req, res, next) => compressionMiddleware.use(req, res, next));
  
  const port = Number(process.env.PORT ?? 3000);
  // Bind to 0.0.0.0 so the server is reachable from other devices on the LAN
  await app.listen(port, '0.0.0.0');
}
bootstrap();
