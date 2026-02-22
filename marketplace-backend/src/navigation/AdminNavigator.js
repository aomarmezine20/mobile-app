"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var AdminDashboardScreen_1 = require("../screens/admin/AdminDashboardScreen");
var UserManagementScreen_1 = require("../screens/admin/UserManagementScreen");
var ProductModerationScreen_1 = require("../screens/admin/ProductModerationScreen");
var OrderOverviewScreen_1 = require("../screens/admin/OrderOverviewScreen");
var ReportsScreen_1 = require("../screens/admin/ReportsScreen");
var Stack = (0, stack_1.createStackNavigator)();
var AdminNavigator = function () {
    return (<Stack.Navigator screenOptions={{
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
        }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen_1.AdminDashboardScreen} options={{ title: 'Admin Dashboard' }}/>
      <Stack.Screen name="Users" component={UserManagementScreen_1.UserManagementScreen} options={{ title: 'User Management' }}/>
      <Stack.Screen name="Products" component={ProductModerationScreen_1.ProductModerationScreen} options={{ title: 'Product Moderation' }}/>
      <Stack.Screen name="Orders" component={OrderOverviewScreen_1.OrderOverviewScreen} options={{ title: 'Order Overview' }}/>
      <Stack.Screen name="Reports" component={ReportsScreen_1.ReportsScreen} options={{ title: 'Reports' }}/>
    </Stack.Navigator>);
};
exports.default = AdminNavigator;
