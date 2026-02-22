"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var DashboardScreen_1 = require("../screens/supplier/DashboardScreen");
var ProductManagementScreen_1 = require("../screens/supplier/ProductManagementScreen");
var OrderManagementScreen_1 = require("../screens/supplier/OrderManagementScreen");
var RevenueScreen_1 = require("../screens/supplier/RevenueScreen");
var Stack = (0, stack_1.createStackNavigator)();
var SupplierNavigator = function () {
    return (<Stack.Navigator screenOptions={{
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
        }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen_1.DashboardScreen} options={{ title: 'Dashboard' }}/>
      <Stack.Screen name="Products" component={ProductManagementScreen_1.ProductManagementScreen} options={{ title: 'Products' }}/>
      <Stack.Screen name="Orders" component={OrderManagementScreen_1.OrderManagementScreen} options={{ title: 'Orders' }}/>
      <Stack.Screen name="Revenue" component={RevenueScreen_1.RevenueScreen} options={{ title: 'Revenue' }}/>
    </Stack.Navigator>);
};
exports.default = SupplierNavigator;
