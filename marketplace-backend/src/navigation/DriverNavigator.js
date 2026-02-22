"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var DeliveryListScreen_1 = require("../screens/driver/DeliveryListScreen");
var DeliveryDetailScreen_1 = require("../screens/driver/DeliveryDetailScreen");
var NavigationScreen_1 = require("../screens/driver/NavigationScreen");
var Stack = (0, stack_1.createStackNavigator)();
var DriverNavigator = function () {
    return (<Stack.Navigator screenOptions={{
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
        }}>
      <Stack.Screen name="Deliveries" component={DeliveryListScreen_1.DeliveryListScreen} options={{ title: 'Deliveries' }}/>
      <Stack.Screen name="DeliveryDetail" component={DeliveryDetailScreen_1.DeliveryDetailScreen} options={{ title: 'Delivery Details' }}/>
      <Stack.Screen name="Navigation" component={NavigationScreen_1.NavigationScreen} options={{ title: 'Navigation' }}/>
    </Stack.Navigator>);
};
exports.default = DriverNavigator;
