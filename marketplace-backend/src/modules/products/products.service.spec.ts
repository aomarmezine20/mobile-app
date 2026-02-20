import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  const mockProduct = {
    id: '1',
    name: 'Test Product',
    description: 'A test product',
    price: 99.99,
    category: 'Electronics',
    stock: 50,
    status: 'available',
    supplierId: 'supplier-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    supplier: {
      id: 'supplier-1',
      email: 'supplier@test.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'SUPPLIER',
    },
    orders: [],
  };

  const mockPrismaService = {
    product: {
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
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = [mockProduct, { ...mockProduct, id: '2', name: 'Product 2' }];
      mockPrismaService.product.findMany.mockResolvedValue(products);

      const result = await service.findAll();

      expect(result).toEqual(products);
      expect(mockPrismaService.product.findMany).toHaveBeenCalled();
      expect(result.length).toBe(2);
    });

    it('should return empty array when no products exist', async () => {
      mockPrismaService.product.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockPrismaService.product.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);

      const result = await service.findOne('1');

      expect(result).toEqual(mockProduct);
      expect(mockPrismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundException when product does not exist', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'New Product',
        description: 'A new product',
        price: 49.99,
        category: 'Books',
        stock: 100,
      };

      mockPrismaService.product.create.mockResolvedValue({
        ...mockProduct,
        ...productData,
      });

      const result = await service.create(productData, 'supplier-1');

      expect(result).toHaveProperty('id');
      expect(result.name).toBe('New Product');
      expect(mockPrismaService.product.create).toHaveBeenCalledWith({
        data: {
          ...productData,
          status: 'available',
          supplier: {
            connect: { id: 'supplier-1' },
          },
        },
        include: expect.any(Object),
      });
    });

    it('should set default status to available when not provided', async () => {
      const productData = {
        name: 'Product',
        description: 'Description',
        price: 10,
        category: 'Test',
        stock: 5,
      };

      mockPrismaService.product.create.mockResolvedValue({
        ...mockProduct,
        ...productData,
        status: 'available',
      });

      await service.create(productData, 'supplier-1');

      expect(mockPrismaService.product.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          status: 'available',
        }),
        include: expect.any(Object),
      });
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateData = { name: 'Updated Product', price: 129.99 };
      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
      mockPrismaService.product.update.mockResolvedValue({
        ...mockProduct,
        ...updateData,
      });

      const result = await service.update('1', updateData);

      expect(result.name).toBe('Updated Product');
      expect(result.price).toBe(129.99);
      expect(mockPrismaService.product.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
        include: expect.any(Object),
      });
    });

    it('should throw NotFoundException when product does not exist', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      await expect(service.update('non-existent-id', { name: 'Updated' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
      mockPrismaService.product.delete.mockResolvedValue(mockProduct);

      const result = await service.remove('1');

      expect(result).toEqual(mockProduct);
      expect(mockPrismaService.product.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException when product does not exist', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findBySupplier', () => {
    it('should return products by supplier id', async () => {
      const products = [mockProduct];
      mockPrismaService.product.findMany.mockResolvedValue(products);

      const result = await service.findBySupplier('supplier-1');

      expect(result).toEqual(products);
      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
        where: { supplierId: 'supplier-1' },
        include: expect.any(Object),
        orderBy: expect.any(Object),
      });
    });
  });

  describe('findByStatus', () => {
    it('should return products by status', async () => {
      const products = [mockProduct];
      mockPrismaService.product.findMany.mockResolvedValue(products);

      const result = await service.findByStatus('available');

      expect(result).toEqual(products);
      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
        where: { status: 'available' },
        include: expect.any(Object),
        orderBy: expect.any(Object),
      });
    });
  });

  describe('toggleStatus', () => {
    it('should toggle product status from available to unavailable', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
      mockPrismaService.product.update.mockResolvedValue({
        ...mockProduct,
        status: 'unavailable',
      });

      const result = await service.toggleStatus('1');

      expect(result.status).toBe('unavailable');
      expect(mockPrismaService.product.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { status: 'unavailable' },
        include: expect.any(Object),
      });
    });

    it('should toggle product status from unavailable to available', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue({
        ...mockProduct,
        status: 'unavailable',
      });
      mockPrismaService.product.update.mockResolvedValue({
        ...mockProduct,
        status: 'available',
      });

      const result = await service.toggleStatus('1');

      expect(result.status).toBe('available');
    });
  });

  describe('searchProducts', () => {
    it('should search products by query', async () => {
      const products = [mockProduct];
      mockPrismaService.product.findMany.mockResolvedValue(products);

      const result = await service.searchProducts('Test');

      expect(result).toEqual(products);
      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
        where: {
          OR: expect.arrayContaining([
            expect.objectContaining({ name: expect.any(Object) }),
            expect.objectContaining({ description: expect.any(Object) }),
            expect.objectContaining({ category: expect.any(Object) }),
          ]),
        },
        include: expect.any(Object),
        orderBy: expect.any(Object),
      });
    });
  });

  describe('getLowStockProducts', () => {
    it('should return products with low stock', async () => {
      const lowStockProduct = { ...mockProduct, stock: 5 };
      mockPrismaService.product.findMany.mockResolvedValue([lowStockProduct]);

      const result = await service.getLowStockProducts(10);

      expect(result).toEqual([lowStockProduct]);
      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
        where: {
          stock: {
            lte: 10,
          },
        },
        include: expect.any(Object),
        orderBy: expect.any(Object),
      });
    });

    it('should use default threshold of 10 when not provided', async () => {
      mockPrismaService.product.findMany.mockResolvedValue([]);

      await service.getLowStockProducts();

      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
        where: {
          stock: {
            lte: 10,
          },
        },
        include: expect.any(Object),
        orderBy: expect.any(Object),
      });
    });
  });
});
