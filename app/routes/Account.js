import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import LogoutScreen from "../scenes/account/Logout";
import UpdateProfileScreen from "../scenes/account/UpdateProfile";

import {headerStyle, headerTitleStyle} from '../theme'

//Create Routes
const AccountStack = createStackNavigator(
    {
        UpdateProfile: UpdateProfileScreen,
        Logout: LogoutScreen,
    },
    {
        initialRouteName: 'UpdateProfile',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default AccountStack;