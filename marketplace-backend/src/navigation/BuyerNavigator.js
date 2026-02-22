"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var HomeScreen_1 = require("../screens/buyer/HomeScreen");
var CartScreen_1 = require("../screens/buyer/CartScreen");
var OrderHistoryScreen_1 = require("../screens/buyer/OrderHistoryScreen");
var ProfileScreen_1 = require("../screens/buyer/ProfileScreen");
var NotificationsScreen_1 = require("../screens/buyer/NotificationsScreen");
var vector_icons_1 = require("@expo/vector-icons");
var Tab = (0, bottom_tabs_1.createBottomTabNavigator)();
var BuyerNavigator = function () {
    return (<Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#2196F3',
            tabBarInactiveTintColor: '#9E9E9E',
            tabBarStyle: {
                backgroundColor: '#FFFFFF',
                borderTopWidth: 0,
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            headerShown: false,
        }}>
      <Tab.Screen name="Home" component={HomeScreen_1.HomeScreen} options={{
            tabBarIcon: function (_a) {
                var color = _a.color, size = _a.size;
                return (<vector_icons_1.Ionicons name="home" size={size} color={color}/>);
            },
        }}/>
      <Tab.Screen name="Cart" component={CartScreen_1.CartScreen} options={{
            tabBarIcon: function (_a) {
                var color = _a.color, size = _a.size;
                return (<vector_icons_1.Ionicons name="cart" size={size} color={color}/>);
            },
        }}/>
      <Tab.Screen name="Orders" component={OrderHistoryScreen_1.OrderHistoryScreen} options={{
            tabBarIcon: function (_a) {
                var color = _a.color, size = _a.size;
                return (<vector_icons_1.Ionicons name="list" size={size} color={color}/>);
            },
        }}/>
      <Tab.Screen name="Notifications" component={NotificationsScreen_1.NotificationsScreen} options={{
            tabBarIcon: function (_a) {
                var color = _a.color, size = _a.size;
                return (<vector_icons_1.Ionicons name="notifications" size={size} color={color}/>);
            },
        }}/>
      <Tab.Screen name="Profile" component={ProfileScreen_1.ProfileScreen} options={{
            tabBarIcon: function (_a) {
                var color = _a.color, size = _a.size;
                return (<vector_icons_1.Ionicons name="person" size={size} color={color}/>);
            },
        }}/>
    </Tab.Navigator>);
};
exports.default = BuyerNavigator;
