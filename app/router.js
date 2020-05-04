import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

//IMPORT ROUTES
import AuthStack from "./routes/Auth";
import HomeStack from "./routes/Home";
import RecipeStack from "./routes/Recipe";
import AccountStack from "./routes/Account";

import AuthLoading from "./scenes/auth/AuthLoading";
import AuthProvider from "./providers/auth";

import Camera from "./scenes/ShowCamera";
//APP ROUTES STACK

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Activity: RecipeStack,
    Account: {
      screen: AccountStack,
      // navigationOptions:{
      //     tabBarVisible: false
      // }
    },
  },
  {
    initialRouteName: "Home",
  }
);

const AppStack = createSwitchNavigator(
  {
    Loading: AuthLoading,
    Auth: AuthStack,
    App: MainTabNavigator,
  },
  { initialRouteName: "Loading" }
);

const Navigator = createAppContainer(AppStack);

export default function Router(props) {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
