import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './config.module';
import { jwtConfig } from './jwt.config';

describe('ConfigurationModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigurationModule],
    }).compile();
  });

  it('should load configuration', async () => {
  const configService = module.get(ConfigService);
  expect(configService).toBeDefined();
  });

  it('should load JWT configuration', async () => {
  const configService = module.get(ConfigService);
  const loadedJwtConfig = configService.get('jwt');
    expect(loadedJwtConfig).toBeDefined();
  });
});