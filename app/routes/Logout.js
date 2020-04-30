import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import LogoutScreen from "../scenes/auth/Logout";

import {headerStyle, headerTitleStyle} from '../theme'

//Create Routes
const LogoutStack = createStackNavigator(
    {
        Logout: LogoutScreen,
    },
    {
        initialRouteName: 'Logout',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default LogoutStack;