import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from "../scenes/home/Home";
import ViewRecipeScreen from "../scenes/recipe/ViewRecipe";

import {headerStyle, headerTitleStyle} from '../theme';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        ViewHomeRecipe: ViewRecipeScreen,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default HomeStack;