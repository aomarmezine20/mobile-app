import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { UserManagementScreen } from '../screens/admin/UserManagementScreen';
import { ProductModerationScreen } from '../screens/admin/ProductModerationScreen';
import { OrderOverviewScreen } from '../screens/admin/OrderOverviewScreen';
import { ReportsScreen } from '../screens/admin/ReportsScreen';

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF9800',
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
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ title: 'Admin Dashboard' }}
      />
      <Stack.Screen
        name="Users"
        component={UserManagementScreen}
        options={{ title: 'User Management' }}
      />
      <Stack.Screen
        name="Products"
        component={ProductModerationScreen}
        options={{ title: 'Product Moderation' }}
      />
      <Stack.Screen
        name="Orders"
        component={OrderOverviewScreen}
        options={{ title: 'Order Overview' }}
      />
      <Stack.Screen
        name="Reports"
        component={ReportsScreen}
        options={{ title: 'Reports' }}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;