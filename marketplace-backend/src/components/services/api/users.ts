import { apiService } from './index';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'supplier' | 'driver' | 'admin';
  avatar: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const userService = {
  getCurrent: async (): Promise<User> => {
    const response = await apiService.get<User>('/users/me');
    return response;
  },

  getById: async (id: string): Promise<User> => {
    const response = await apiService.get<User>('/users/' + id);
    return response;
  },

  update: async (userData: Partial<User>): Promise<User> => {
    const response = await apiService.put<User>('/users/me', userData);
    return response;
  },

  updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await apiService.put('/users/me/password', { currentPassword, newPassword });
  },

  getAll: async (params?: any): Promise<User[]> => {
    const response = await apiService.get<User[]>('/users', { params });
    return response;
  },

  create: async (userData: Partial<User>): Promise<User> => {
    const response = await apiService.post<User>('/users', userData);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await apiService.delete('/users/' + id);
  },

  updateRole: async (id: string, role: User['role']): Promise<User> => {
    const response = await apiService.patch<User>('/users/' + id + '/role', { role });
    return response;
  },

  activate: async (id: string): Promise<User> => {
    const response = await apiService.patch<User>('/users/' + id + '/activate');
    return response;
  },

  deactivate: async (id: string): Promise<User> => {
    const response = await apiService.patch<User>('/users/' + id + '/deactivate');
    return response;
  },
};