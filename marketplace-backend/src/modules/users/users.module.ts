import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { AuthModule } from '../../modules/auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesGuard } from '../../../guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class UsersModule {}