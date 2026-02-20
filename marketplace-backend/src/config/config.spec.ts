import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
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
    const configService = module.get(ConfigModule);
    expect(configService).toBeDefined();
  });

  it('should load JWT configuration', async () => {
    const configService = module.get(ConfigModule);
    const jwtConfig = configService.get(jwtConfig.KEY);
    expect(jwtConfig).toBeDefined();
  });
});