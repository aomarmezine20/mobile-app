import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../../database/prisma/prisma.service';

jest.mock('bcryptjs', () => ({
  hash: jest.fn((password) => Promise.resolve(`hashed_${password}`)),
  compare: jest.fn((password, hashedPassword) =>
    Promise.resolve(hashedPassword === `hashed_${password}`)
  ),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockUser = {
    id: 'user-1',
    email: 'user@test.com',
    password: 'hashed_password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Buyer',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockJwtToken = {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  };

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue(mockJwtToken.access_token),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user without password when credentials are valid', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.validateUser('user@test.com', 'password123');

      expect(result).toBeDefined();
      expect(result.password).toBeUndefined();
      expect(result.email).toBe('user@test.com');
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'user@test.com' },
      });
    });

    it('should return null when user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent@test.com', 'password123');

      expect(result).toBeNull();
    });

    it('should return null when password is incorrect', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.validateUser('user@test.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user when credentials are valid', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.login({
        email: 'user@test.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe('user@test.com');
      expect(result.user.password).toBeUndefined();
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: 'user@test.com',
        sub: 'user-1',
        role: 'Buyer',
      });
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'nonexistent@test.com',
          password: 'password123',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.login({
          email: 'user@test.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should include user role in JWT payload', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        ...mockUser,
        role: 'Supplier',
      });

      await service.login({
        email: 'user@test.com',
        password: 'password123',
      });

      expect(jwtService.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'Supplier',
        }),
      );
    });
  });

  describe('register', () => {
    it('should create a new user and return access token', async () => {
      const registerDto = {
        email: 'newuser@test.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'Buyer',
      };

      const createdUser = {
        id: 'user-2',
        email: 'newuser@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'Buyer',
        isActive: true,
        createdAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue(createdUser);

      const result = await service.register(registerDto);

      expect(result).toHaveProperty('access_token');
      expect(result.user.email).toBe('newuser@test.com');
      expect(mockPrismaService.user.create).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when email already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.register({
          email: 'user@test.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should set default role to Buyer when not provided', async () => {
      const registerDto = {
        email: 'newuser@test.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
      };

      const createdUser = {
        id: 'user-2',
        email: 'newuser@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'Buyer',
        isActive: true,
        createdAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue(createdUser);

      await service.register(registerDto);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          role: 'Buyer',
        }),
        select: expect.any(Object),
      });
    });

    it('should hash password before storing', async () => {
      const registerDto = {
        email: 'newuser@test.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        id: 'user-2',
        email: 'newuser@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'Buyer',
        isActive: true,
        createdAt: new Date(),
      });

      await service.register(registerDto);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          password: 'hashed_password123',
        }),
        select: expect.any(Object),
      });
    });

    it('should create JWT token for new user', async () => {
      const registerDto = {
        email: 'newuser@test.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'Supplier',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        id: 'user-2',
        email: 'newuser@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'Supplier',
        isActive: true,
        createdAt: new Date(),
      });

      await service.register(registerDto);

      expect(jwtService.sign).toHaveBeenCalled();
    });

    it('should not include password in returned user object', async () => {
      const registerDto = {
        email: 'newuser@test.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        id: 'user-2',
        email: 'newuser@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'Buyer',
        isActive: true,
        createdAt: new Date(),
      });

      const result = await service.register(registerDto);

      expect(result.user.password).toBeUndefined();
    });
  });
});
