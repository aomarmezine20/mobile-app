import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../hooks/useRole';

// Screens
import AuthNavigator from './AuthNavigator';
import BuyerNavigator from './BuyerNavigator';
import SupplierNavigator from './SupplierNavigator';
import DriverNavigator from './DriverNavigator';
import AdminNavigator from './AdminNavigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  const { role } = useRole();

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  switch (role) {
    case 'buyer':
      return <BuyerNavigator />;
    case 'supplier':
      return <SupplierNavigator />;
    case 'driver':
      return <DriverNavigator />;
    case 'admin':
      return <AdminNavigator />;
    default:
      return <AuthNavigator />;
  }
};

const AppContainer = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppContainer;