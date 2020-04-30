import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";

//IMPORT ROUTES
import AuthStack from "./routes/Auth";
import HomeStack from "./routes/Home";
import RecipeStack from "./routes/Recipe";
import AccountStack from "./routes/Account";
// import BottomTabNavigator from "./routes/BottomTabNavigator";

import AuthLoading from "./scenes/auth/AuthLoading";
import AuthProvider from "./providers/auth";

//APP ROUTES STACK

const MainTabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Recipe: RecipeStack,
    Account: AccountStack,
  },
  {
      initialRouteName: 'Home',
  });
  
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        Auth: AuthStack,
        App: MainTabNavigator,
    },
    {initialRouteName: 'Loading'}
);

const Navigator = createAppContainer(AppStack);

export default function Router(props) {
    return (
        <AuthProvider>
            <Navigator/>
        </AuthProvider>
    );
}