import { apiService } from './index';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  supplierId: string;
  createdAt: string;
  updatedAt: string;
}

export const productService = {
  getAll: async (params?: any): Promise<Product[]> => {
    const response = await apiService.get<Product[]>('/products', { params });
    return response;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await apiService.get<Product>('/products/' + id);
    return response;
  },

  create: async (productData: Partial<Product>): Promise<Product> => {
    const response = await apiService.post<Product>('/products', productData);
    return response;
  },

  update: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const response = await apiService.put<Product>('/products/' + id, productData);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await apiService.delete('/products/' + id);
  },

  search: async (query: string, params?: any): Promise<Product[]> => {
    const response = await apiService.get<Product[]>('/products/search', {
      params: { q: query, ...params },
    });
    return response;
  },

  getByCategory: async (category: string, params?: any): Promise<Product[]> => {
    const response = await apiService.get<Product[]>('/products/category/' + category, {
      params,
    });
    return response;
  },

  getFeatured: async (limit: number = 10): Promise<Product[]> => {
    const response = await apiService.get<Product[]>('/products/featured', {
      params: { limit },
    });
    return response;
  },
};