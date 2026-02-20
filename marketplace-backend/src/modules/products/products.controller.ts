import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../../guards/roles.decorator';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @Roles('Supplier')
  async create(@Body() productData: any, @Request() req: any) {
    return this.productsService.create(productData, req.user.id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Roles('Supplier')
  async update(@Param('id') id: string, @Body() productData: any) {
    return this.productsService.update(id, productData);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Roles('Supplier')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('/supplier/:supplierId')
  @ApiOperation({ summary: 'Get products by supplier' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findBySupplier(@Param('supplierId') supplierId: string) {
    return this.productsService.findBySupplier(supplierId);
  }

  @Get('/status/:status')
  @ApiOperation({ summary: 'Get products by status' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findByStatus(@Param('status') status: string) {
    return this.productsService.findByStatus(status);
  }

  @Post('/:id/toggle-status')
  @ApiOperation({ summary: 'Toggle product status' })
  @ApiResponse({ status: 200, description: 'Product status toggled successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Roles('Supplier')
  async toggleStatus(@Param('id') id: string) {
    return this.productsService.toggleStatus(id);
  }
}