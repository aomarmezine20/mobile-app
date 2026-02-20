import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigurationModule } from '../../config/config.module';
import { jwtConfig } from '../../config/jwt.config';

@Module({
  imports: [
    ConfigurationModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: async (config: any) => ({
        secret: config.jwt.secret,
        signOptions: { expiresIn: config.jwt.expiresIn },
      }),
      inject: [jwtConfig.KEY],
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}