import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from "../components/Header";
import RegisterScreen from "../scenes/auth/Register";
import LoginScreen from "../scenes/auth/Login";
import ForgotPasswordScreen from "../scenes/auth/ForgotPassword";

const AuthNav = createStackNavigator();

export default function AuthStack() {
    return (
        <AuthNav.Navigator 
        initialRouteName="Login"
        headerMode="screen"
        screenOptions={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} previous={previous} navigation={navigation} />
          ),
        }}>
            <AuthNav.Screen name="Login" component={LoginScreen} />
            <AuthNav.Screen name="Register" component={RegisterScreen} />
            <AuthNav.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </AuthNav.Navigator>
    )
}