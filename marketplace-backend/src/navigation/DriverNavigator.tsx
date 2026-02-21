import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DeliveryListScreen } from '../screens/driver/DeliveryListScreen';
import { DeliveryDetailScreen } from '../screens/driver/DeliveryDetailScreen';
import { NavigationScreen } from '../screens/driver/NavigationScreen';

const Stack = createStackNavigator();

const DriverNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4CAF50',
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
        name="Deliveries"
        component={DeliveryListScreen}
        options={{ title: 'Deliveries' }}
      />
      <Stack.Screen
        name="DeliveryDetail"
        component={DeliveryDetailScreen}
        options={{ title: 'Delivery Details' }}
      />
      <Stack.Screen
        name="Navigation"
        component={NavigationScreen}
        options={{ title: 'Navigation' }}
      />
    </Stack.Navigator>
  );
};

export default DriverNavigator;