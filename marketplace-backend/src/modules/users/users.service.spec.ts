import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import * as bcryptjs from 'bcryptjs';

jest.mock('bcryptjs');

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const mockUser = {
    id: '1',
    email: 'user@test.com',
    password: 'hashed_password_123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Buyer',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
    orders: [],
    deliveries: [],
  };

  const mockPrismaService = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
    (bcryptjs.hash as jest.Mock).mockClear();
  });

  describe('findAll', () => {
    it('should return all users with relations', async () => {
      const users = [mockUser, { ...mockUser, id: '2', email: 'user2@test.com' }];
      mockPrismaService.user.findMany.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(result.length).toBe(2);
      expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
        include: expect.objectContaining({
          products: expect.any(Object),
          orders: expect.any(Object),
          deliveries: expect.any(Object),
        }),
      });
    });

    it('should return empty array when no users exist', async () => {
      mockPrismaService.user.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a user by id with relations', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne('1');

      expect(result).toEqual(mockUser);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('register', () => {
    it('should register a new user with password hashing', async () => {
      const userData = {
        email: 'newuser@test.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
      };

      const hashedPassword = 'hashed_password_from_bcrypt';
      (bcryptjs.hash as jest.Mock).mockResolvedValue(hashedPassword);

      mockPrismaService.user.create.mockResolvedValue({
        ...mockUser,
        ...userData,
        password: hashedPassword,
        role: 'Buyer',
      });

      const result = await service.register(userData);

      expect(result.email).toBe('newuser@test.com');
      expect(result.firstName).toBe('Jane');
      expect(bcryptjs.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: userData.email,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: 'Buyer',
        },
        include: expect.any(Object),
      });
    });

    it('should set default role to Buyer when not provided', async () => {
      const userData = {
        email: 'newuser@test.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
      };

      (bcryptjs.hash as jest.Mock).mockResolvedValue('hashed_password');
      mockPrismaService.user.create.mockResolvedValue({
        ...mockUser,
        ...userData,
        role: 'Buyer',
      });

      await service.register(userData);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          role: 'Buyer',
        }),
        include: expect.any(Object),
      });
    });

    it('should use custom role when provided', async () => {
      const userData = {
        email: 'supplier@test.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Supplier',
        role: 'Supplier',
      };

      (bcryptjs.hash as jest.Mock).mockResolvedValue('hashed_password');
      mockPrismaService.user.create.mockResolvedValue({
        ...mockUser,
        ...userData,
      });

      await service.register(userData);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          role: 'Supplier',
        }),
        include: expect.any(Object),
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.register({
          email: 'user@test.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
        }),
      ).rejects.toThrow(ConflictException);

      expect(bcryptjs.hash).not.toHaveBeenCalled();
      expect(mockPrismaService.user.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateData = { firstName: 'Johnny', role: 'Supplier' };
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.update.mockResolvedValue({
        ...mockUser,
        ...updateData,
      });

      const result = await service.update('1', updateData);

      expect(result.firstName).toBe('Johnny');
      expect(result.role).toBe('Supplier');
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', { firstName: 'Updated' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update only provided fields', async () => {
      const partialUpdate = { isActive: false };
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.update.mockResolvedValue({
        ...mockUser,
        ...partialUpdate,
      });

      await service.update('1', partialUpdate);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: partialUpdate,
        include: expect.any(Object),
      });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.delete.mockResolvedValue(mockUser);

      const result = await service.remove('1');

      expect(result).toEqual(mockUser);
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findByEmail('user@test.com');

      expect(result).toEqual(mockUser);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'user@test.com' },
      });
    });

    it('should return null when email does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.findByEmail('nonexistent@test.com');

      expect(result).toBeNull();
    });
  });

  describe('activateUser', () => {
    it('should activate a user account', async () => {
      mockPrismaService.user.update.mockResolvedValue({
        ...mockUser,
        isActive: true,
      });

      const result = await service.activateUser('1');

      expect(result.isActive).toBe(true);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { isActive: true },
      });
    });
  });

  describe('deactivateUser', () => {
    it('should deactivate a user account', async () => {
      mockPrismaService.user.update.mockResolvedValue({
        ...mockUser,
        isActive: false,
      });

      const result = await service.deactivateUser('1');

      expect(result.isActive).toBe(false);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { isActive: false },
      });
    });
  });

  describe('getUsersByRole', () => {
    it('should return users filtered by role', async () => {
      const suppliers = [{ ...mockUser, role: 'Supplier' }];
      mockPrismaService.user.findMany.mockResolvedValue(suppliers);

      const result = await service.getUsersByRole('Supplier');

      expect(result).toEqual(suppliers);
      expect(result[0].role).toBe('Supplier');
      expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
        where: { role: 'Supplier' },
        include: expect.any(Object),
      });
    });

    it('should return empty array when no users with role exist', async () => {
      mockPrismaService.user.findMany.mockResolvedValue([]);

      const result = await service.getUsersByRole('Admin');

      expect(result).toEqual([]);
    });

    it('should retrieve multiple users with same role', async () => {
      const buyers = [
        { ...mockUser, id: '1', role: 'Buyer' },
        { ...mockUser, id: '2', email: 'buyer2@test.com', role: 'Buyer' },
        { ...mockUser, id: '3', email: 'buyer3@test.com', role: 'Buyer' },
      ];
      mockPrismaService.user.findMany.mockResolvedValue(buyers);

      const result = await service.getUsersByRole('Buyer');

      expect(result.length).toBe(3);
      expect(result.every((user) => user.role === 'Buyer')).toBe(true);
    });
  });
});
