import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../scenes/home/Home";
import ViewRecipeScreen from "../scenes/recipe/ViewRecipe";

const HomeNav = createStackNavigator();

export default function HomeStack() {
    return (
        <HomeNav.Navigator>
            <HomeNav.Screen name="Home" component={HomeScreen} />
            <HomeNav.Screen name="ViewHomeRecipe" component={ViewRecipeScreen} />
        </HomeNav.Navigator>
    )
}
