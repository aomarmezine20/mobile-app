import { apiService } from './index';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiService.post<LoginResponse>('/auth/login', credentials);
    return response;
  },

  register: async (userData: any): Promise<LoginResponse> => {
    const response = await apiService.post<LoginResponse>('/auth/register', userData);
    return response;
  },

  logout: async (): Promise<void> => {
    await apiService.post('/auth/logout');
  },

  refresh: async (): Promise<LoginResponse> => {
    const response = await apiService.post<LoginResponse>('/auth/refresh');
    return response;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiService.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await apiService.post('/auth/reset-password', { token, newPassword });
  },
};