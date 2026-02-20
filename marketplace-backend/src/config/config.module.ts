import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import appConfig from './app.config';
import databaseConfig from './database.config';
import { jwtConfig } from './jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      load: [appConfig, databaseConfig, jwtConfig],
    }),
  ],
})
export class ConfigurationModule {}