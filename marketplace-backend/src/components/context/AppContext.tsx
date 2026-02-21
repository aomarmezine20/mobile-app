import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Product, CartItem, Order } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface CartState {
  items: CartItem[];
  total: number;
}

interface AppState {
  auth: AuthState;
  cart: CartState;
}

type Action =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART_ITEMS'; payload: CartItem[] };

const initialState: AppState = {
  auth: {
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
  },
  cart: {
    items: [],
    total: 0,
  },
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        auth: { ...state.auth, isLoading: true },
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload.user,
          token: action.payload.token,
          isLoading: false,
          isAuthenticated: true,
        },
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        auth: { ...state.auth, isLoading: false },
      };

    case 'LOGOUT':
      return {
        ...state,
        auth: { user: null, token: null, isLoading: false, isAuthenticated: false },
        cart: { items: [], total: 0 },
      };

    case 'SET_USER':
      return {
        ...state,
        auth: { ...state.auth, user: action.payload },
      };

    case 'SET_LOADING':
      return {
        ...state,
        auth: { ...state.auth, isLoading: action.payload },
      };

    case 'ADD_TO_CART':
      const existingItem = state.cart.items.find(item => item.id === action.payload.id);
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.cart.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.cart.items, action.payload];
      }
      
      const newTotal = newItems.reduce((total, item) => total + item.price * item.quantity, 0);
      
      return {
        ...state,
        cart: { items: newItems, total: newTotal },
      };

    case 'REMOVE_FROM_CART':
      const filteredItems = state.cart.items.filter(item => item.id !== action.payload);
      const filteredTotal = filteredItems.reduce((total, item) => total + item.price * item.quantity, 0);
      
      return {
        ...state,
        cart: { items: filteredItems, total: filteredTotal },
      };

    case 'UPDATE_CART_ITEM':
      const updatedItems = state.cart.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const updatedTotal = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
      
      return {
        ...state,
        cart: { items: updatedItems, total: updatedTotal },
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: { items: [], total: 0 },
      };

    case 'SET_CART_ITEMS':
      const cartTotal = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
      return {
        ...state,
        cart: { items: action.payload, total: cartTotal },
      };

    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // Simulate API call
      const user: User = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'buyer',
        avatar: 'https://example.com/avatar.jpg',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const token = 'mock-jwt-token';
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateCartItem = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setUser = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const value: AppContextType = {
    state,
    dispatch,
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};