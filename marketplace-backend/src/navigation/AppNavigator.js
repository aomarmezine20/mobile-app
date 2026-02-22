"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var native_1 = require("@react-navigation/native");
var stack_1 = require("@react-navigation/stack");
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var drawer_1 = require("@react-navigation/drawer");
var AuthContext_1 = require("../context/AuthContext");
var useRole_1 = require("../hooks/useRole");
// Screens
var AuthNavigator_1 = require("./AuthNavigator");
var BuyerNavigator_1 = require("./BuyerNavigator");
var SupplierNavigator_1 = require("./SupplierNavigator");
var DriverNavigator_1 = require("./DriverNavigator");
var AdminNavigator_1 = require("./AdminNavigator");
var Stack = (0, stack_1.createStackNavigator)();
var Tab = (0, bottom_tabs_1.createBottomTabNavigator)();
var Drawer = (0, drawer_1.createDrawerNavigator)();
var AppNavigator = function () {
    var isAuthenticated = (0, AuthContext_1.useAuth)().isAuthenticated;
    var role = (0, useRole_1.useRole)().role;
    if (!isAuthenticated) {
        return <AuthNavigator_1.default />;
    }
    switch (role) {
        case 'buyer':
            return <BuyerNavigator_1.default />;
        case 'supplier':
            return <SupplierNavigator_1.default />;
        case 'driver':
            return <DriverNavigator_1.default />;
        case 'admin':
            return <AdminNavigator_1.default />;
        default:
            return <AuthNavigator_1.default />;
    }
};
var AppContainer = function () {
    return (<native_1.NavigationContainer>
      <AppNavigator />
    </native_1.NavigationContainer>);
};
exports.default = AppContainer;
