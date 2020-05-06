import React from "react";
import { Icon } from 'react-native-elements' 
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

//IMPORT ROUTES
import AuthStack from "./routes/Auth";
import HomeStack from "./routes/Home";
import RecipeStack from "./routes/Recipe";
import AccountStack from "./routes/Account";

import AuthLoading from "./scenes/auth/AuthLoading";
import AuthProvider from "./providers/auth";

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel:"Home",
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={30} color={tintColor} />
        )
      },
    },
    Activity: {
      screen: RecipeStack,
      navigationOptions: {
        tabBarLabel:"Activity",
        tabBarIcon: ({tintColor}) => (
          <Icon name="local-activity" size={30} color={tintColor} />
        )
      }
    },
    Account: {
      screen: AccountStack,
      navigationOptions: {
        tabBarLabel:"Account",
        tabBarIcon: ({tintColor}) => (
          <Icon name="account-circle" size={30} color={tintColor} />
        )
      }
    },
  },
  {
    initialRouteName: "Home",
    order: ['Home', 'Activity', 'Account'],
    tabBarOptions: {
      activeTintColor: '#cc3300',
      inactiveTintColor: '#006600',
      style: {
        backgroundColor: '#ddd',
      }
    },
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
