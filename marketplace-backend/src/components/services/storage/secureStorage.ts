import AsyncStorage from '@react-native-async-storage/async-storage';

class SecureStorage {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'user_data';

  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(SecureStorage.TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(SecureStorage.TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SecureStorage.TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  async setUser(user: any): Promise<void> {
    try {
      await AsyncStorage.setItem(SecureStorage.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  async getUser(): Promise<any | null> {
    try {
      const userString = await AsyncStorage.getItem(SecureStorage.USER_KEY);
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SecureStorage.USER_KEY);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([SecureStorage.TOKEN_KEY, SecureStorage.USER_KEY]);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  async getRole(): Promise<string | null> {
    try {
      const user = await this.getUser();
      return user ? user.role : null;
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
  }
}

export const SecureStorage = new SecureStorage();