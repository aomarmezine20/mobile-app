import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '../screens/supplier/DashboardScreen';
import { ProductManagementScreen } from '../screens/supplier/ProductManagementScreen';
import { OrderManagementScreen } from '../screens/supplier/OrderManagementScreen';
import { RevenueScreen } from '../screens/supplier/RevenueScreen';

const Stack = createStackNavigator();

const SupplierNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen
        name="Products"
        component={ProductManagementScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name="Orders"
        component={OrderManagementScreen}
        options={{ title: 'Orders' }}
      />
      <Stack.Screen
        name="Revenue"
        component={RevenueScreen}
        options={{ title: 'Revenue' }}
      />
    </Stack.Navigator>
  );
};

export default SupplierNavigator;