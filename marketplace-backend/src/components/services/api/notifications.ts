import { apiService } from './index';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export const notificationService = {
  getAll: async (params?: any): Promise<Notification[]> => {
    const response = await apiService.get<Notification[]>('/notifications', { params });
    return response;
  },

  getById: async (id: string): Promise<Notification> => {
    const response = await apiService.get<Notification>('/notifications/' + id);
    return response;
  },

  create: async (notificationData: Partial<Notification>): Promise<Notification> => {
    const response = await apiService.post<Notification>('/notifications', notificationData);
    return response;
  },

  update: async (id: string, notificationData: Partial<Notification>): Promise<Notification> => {
    const response = await apiService.put<Notification>('/notifications/' + id, notificationData);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await apiService.delete('/notifications/' + id);
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await apiService.patch<Notification>('/notifications/' + id + '/read');
    return response;
  },

  markAllAsRead: async (): Promise<void> => {
    await apiService.patch('/notifications/mark-all-read');
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await apiService.get<{ count: number }>('/notifications/unread-count');
    return response.count;
  },

  getUserNotifications: async (userId: string, params?: any): Promise<Notification[]> => {
    const response = await apiService.get<Notification[]>('/notifications/user/' + userId, {
      params,
    });
    return response;
  },
};