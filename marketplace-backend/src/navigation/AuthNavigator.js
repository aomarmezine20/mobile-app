"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var LoginScreen_1 = require("../screens/auth/LoginScreen");
var RegisterScreen_1 = require("../screens/auth/RegisterScreen");
var ForgotPasswordScreen_1 = require("../screens/auth/ForgotPasswordScreen");
var Stack = (0, stack_1.createStackNavigator)();
var AuthNavigator = function () {
    return (<Stack.Navigator screenOptions={{
            headerShown: false,
            animationEnabled: true,
            animationTypeForReplace: 'push',
        }}>
      <Stack.Screen name="Login" component={LoginScreen_1.LoginScreen}/>
      <Stack.Screen name="Register" component={RegisterScreen_1.RegisterScreen}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen_1.ForgotPasswordScreen}/>
    </Stack.Navigator>);
};
exports.default = AuthNavigator;
