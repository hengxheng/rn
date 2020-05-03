import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import HomeScreen from "../scenes/home/Home";

import {headerStyle, headerTitleStyle} from '../theme';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default HomeStack;