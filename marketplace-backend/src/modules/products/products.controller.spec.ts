import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

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

  const mockProductsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findBySupplier: jest.fn(),
    findByStatus: jest.fn(),
    toggleStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = [mockProduct];
      mockProductsService.findAll.mockResolvedValue(products);

      const result = await controller.findAll();

      expect(result).toEqual(products);
      expect(mockProductsService.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no products exist', async () => {
      mockProductsService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      mockProductsService.findOne.mockResolvedValue(mockProduct);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockProduct);
      expect(mockProductsService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw error when product not found', async () => {
      mockProductsService.findOne.mockRejectedValue(
        new Error('Product not found'),
      );

      await expect(controller.findOne('invalid-id')).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'New Product',
        description: 'Description',
        price: 99.99,
        category: 'Electronics',
        stock: 50,
      };

      const mockRequest = {
        user: {
          id: 'supplier-1',
          email: 'supplier@test.com',
          role: 'Supplier',
        },
      };

      mockProductsService.create.mockResolvedValue({
        ...mockProduct,
        ...productData,
      });

      const result = await controller.create(productData, mockRequest);

      expect(result).toHaveProperty('id');
      expect(mockProductsService.create).toHaveBeenCalledWith(
        productData,
        'supplier-1',
      );
    });

    it('should pass supplier id from request user', async () => {
      const productData = {
        name: 'Product',
        description: 'Description',
        price: 50,
        category: 'Books',
        stock: 100,
      };

      const mockRequest = {
        user: {
          id: 'supplier-123',
          email: 'supplier@test.com',
          role: 'Supplier',
        },
      };

      mockProductsService.create.mockResolvedValue(mockProduct);

      await controller.create(productData, mockRequest);

      expect(mockProductsService.create).toHaveBeenCalledWith(
        productData,
        'supplier-123',
      );
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateData = { name: 'Updated Product' };
      mockProductsService.update.mockResolvedValue({
        ...mockProduct,
        ...updateData,
      });

      const result = await controller.update('1', updateData);

      expect(result.name).toBe('Updated Product');
      expect(mockProductsService.update).toHaveBeenCalledWith('1', updateData);
    });

    it('should handle partial updates', async () => {
      const updateData = { price: 149.99 };
      mockProductsService.update.mockResolvedValue({
        ...mockProduct,
        ...updateData,
      });

      const result = await controller.update('1', updateData);

      expect(result.price).toBe(149.99);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      mockProductsService.remove.mockResolvedValue(mockProduct);

      const result = await controller.remove('1');

      expect(result).toEqual(mockProduct);
      expect(mockProductsService.remove).toHaveBeenCalledWith('1');
    });

    it('should throw error when product not found', async () => {
      mockProductsService.remove.mockRejectedValue(
        new Error('Product not found'),
      );

      await expect(controller.remove('invalid-id')).rejects.toThrow();
    });
  });

  describe('findBySupplier', () => {
    it('should return products by supplier id', async () => {
      const products = [mockProduct];
      mockProductsService.findBySupplier.mockResolvedValue(products);

      const result = await controller.findBySupplier('supplier-1');

      expect(result).toEqual(products);
      expect(mockProductsService.findBySupplier).toHaveBeenCalledWith(
        'supplier-1',
      );
    });

    it('should return empty array for supplier with no products', async () => {
      mockProductsService.findBySupplier.mockResolvedValue([]);

      const result = await controller.findBySupplier('supplier-no-products');

      expect(result).toEqual([]);
    });
  });

  describe('findByStatus', () => {
    it('should return products by status', async () => {
      const availableProducts = [
        { ...mockProduct, status: 'available' },
      ];
      mockProductsService.findByStatus.mockResolvedValue(availableProducts);

      const result = await controller.findByStatus('available');

      expect(result).toEqual(availableProducts);
      expect(mockProductsService.findByStatus).toHaveBeenCalledWith(
        'available',
      );
    });

    it('should return unavailable products', async () => {
      const unavailableProducts = [{ ...mockProduct, status: 'unavailable' }];
      mockProductsService.findByStatus.mockResolvedValue(unavailableProducts);

      const result = await controller.findByStatus('unavailable');

      expect(result).toEqual(unavailableProducts);
    });
  });

  describe('toggleStatus', () => {
    it('should toggle product status', async () => {
      const updatedProduct = {
        ...mockProduct,
        status: 'unavailable',
      };
      mockProductsService.toggleStatus.mockResolvedValue(updatedProduct);

      const result = await controller.toggleStatus('1');

      expect(result.status).toBe('unavailable');
      expect(mockProductsService.toggleStatus).toHaveBeenCalledWith('1');
    });

    it('should toggle back to available', async () => {
      const updatedProduct = {
        ...mockProduct,
        status: 'available',
      };
      mockProductsService.toggleStatus.mockResolvedValue(updatedProduct);

      const result = await controller.toggleStatus('1');

      expect(result.status).toBe('available');
    });
  });
});
