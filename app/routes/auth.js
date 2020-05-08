import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//IMPORT SCENES
import RegisterScreen from "../scenes/auth/Register";
import LoginScreen from "../scenes/auth/Login";
import ForgotPasswordScreen from "../scenes/auth/ForgotPassword";

const AuthNav = createStackNavigator();

export default function AuthStack() {
    return (
        <AuthNav.Navigator>
            <AuthNav.Screen name="Login" component={LoginScreen} />
            <AuthNav.Screen name="Register" component={RegisterScreen} />
            <AuthNav.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </AuthNav.Navigator>
    )
}