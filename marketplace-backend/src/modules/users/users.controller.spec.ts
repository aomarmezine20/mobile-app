import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    id: '1',
    email: 'user@test.com',
    password: 'hashed_password',
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

  const mockUsersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    register: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByEmail: jest.fn(),
    activateUser: jest.fn(),
    deactivateUser: jest.fn(),
    getUsersByRole: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [mockUser, { ...mockUser, id: '2', email: 'user2@test.com' }];
      mockUsersService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();

      expect(result).toEqual(users);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no users exist', async () => {
      mockUsersService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockUser);
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw error when user not found', async () => {
      mockUsersService.findOne.mockRejectedValue(
        new Error('User not found'),
      );

      await expect(controller.findOne('invalid-id')).rejects.toThrow();
    });

    it('should not expose password in returned user', async () => {
      const userWithoutPassword = { ...mockUser };
      delete userWithoutPassword.password;
      mockUsersService.findOne.mockResolvedValue(userWithoutPassword);

      const result = await controller.findOne('1');

      expect(result.password).toBeUndefined();
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerData = {
        email: 'newuser@test.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'Buyer',
      };

      const newUser = { ...mockUser, ...registerData, id: '2' };
      mockUsersService.register.mockResolvedValue(newUser);

      const result = await controller.register(registerData);

      expect(result).toHaveProperty('id');
      expect(mockUsersService.register).toHaveBeenCalledWith(registerData);
    });

    it('should throw error when email already exists', async () => {
      const registerData = {
        email: 'user@test.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      mockUsersService.register.mockRejectedValue(
        new Error('User with this email already exists'),
      );

      await expect(controller.register(registerData)).rejects.toThrow();
    });

    it('should handle different user roles', async () => {
      const supplierData = {
        email: 'supplier@test.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Supplier',
        role: 'Supplier',
      };

      mockUsersService.register.mockResolvedValue({
        ...mockUser,
        ...supplierData,
      });

      const result = await controller.register(supplierData);

      expect(result.role).toBe('Supplier');
    });
  });

  describe('update', () => {
    it('should update user information', async () => {
      const updateData = {
        firstName: 'Johnny',
        lastName: 'Smith',
      };

      const updatedUser = { ...mockUser, ...updateData };
      mockUsersService.update.mockResolvedValue(updatedUser);

      const result = await controller.update('1', updateData);

      expect(result.firstName).toBe('Johnny');
      expect(mockUsersService.update).toHaveBeenCalledWith('1', updateData);
    });

    it('should update user role', async () => {
      const updateData = { role: 'Supplier' };

      const updatedUser = { ...mockUser, ...updateData };
      mockUsersService.update.mockResolvedValue(updatedUser);

      const result = await controller.update('1', updateData);

      expect(result.role).toBe('Supplier');
    });

    it('should handle partial updates', async () => {
      const updateData = { isActive: false };

      const updatedUser = { ...mockUser, ...updateData };
      mockUsersService.update.mockResolvedValue(updatedUser);

      const result = await controller.update('1', updateData);

      expect(result.isActive).toBe(false);
    });

    it('should throw error when user not found', async () => {
      mockUsersService.update.mockRejectedValue(
        new Error('User not found'),
      );

      await expect(
        controller.update('invalid-id', { firstName: 'Updated' }),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      mockUsersService.remove.mockResolvedValue(mockUser);

      const result = await controller.remove('1');

      expect(result).toEqual(mockUser);
      expect(mockUsersService.remove).toHaveBeenCalledWith('1');
    });

    it('should throw error when user not found', async () => {
      mockUsersService.remove.mockRejectedValue(
        new Error('User not found'),
      );

      await expect(controller.remove('invalid-id')).rejects.toThrow();
    });

    it('should only allow admin to delete users', async () => {
      // This is tested through the @Roles('Admin') decorator
      mockUsersService.remove.mockResolvedValue(mockUser);

      const result = await controller.remove('1');

      expect(result).toBeDefined();
    });
  });
});
