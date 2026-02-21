import { apiService } from './index';

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  getAll: async (params?: any): Promise<Order[]> => {
    const response = await apiService.get<Order[]>('/orders', { params });
    return response;
  },

  getById: async (id: string): Promise<Order> => {
    const response = await apiService.get<Order>('/orders/' + id);
    return response;
  },

  create: async (orderData: Partial<Order>): Promise<Order> => {
    const response = await apiService.post<Order>('/orders', orderData);
    return response;
  },

  update: async (id: string, orderData: Partial<Order>): Promise<Order> => {
    const response = await apiService.put<Order>('/orders/' + id, orderData);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await apiService.delete('/orders/' + id);
  },

  getByStatus: async (status: string, params?: any): Promise<Order[]> => {
    const response = await apiService.get<Order[]>('/orders/status/' + status, {
      params,
    });
    return response;
  },

  getUserOrders: async (userId: string, params?: any): Promise<Order[]> => {
    const response = await apiService.get<Order[]>('/orders/user/' + userId, {
      params,
    });
    return response;
  },

  getSupplierOrders: async (supplierId: string, params?: any): Promise<Order[]> => {
    const response = await apiService.get<Order[]>('/orders/supplier/' + supplierId, {
      params,
    });
    return response;
  },

  updateStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const response = await apiService.patch<Order>('/orders/' + id + '/status', { status });
    return response;
  },
};