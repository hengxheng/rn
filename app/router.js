import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

//IMPORT ROUTES
import AuthStack from "./routes/Auth";
import HomeStack from "./routes/Home";
import RecipeStack from "./routes/Recipe";
import AccountStack from "./routes/Account";

import AuthLoading from "./scenes/auth/AuthLoading";
import AuthProvider from "./providers/auth";

const MainTab = createMaterialBottomTabNavigator();

function MainTabNavigator() {
  return (
    <MainTab.Navigator
    initialRouteName="Home"
  activeColor="#f0edf6"
  inactiveColor="#3e2465"
  barStyle={{ backgroundColor: '#694fad' }}>
      <MainTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: "home-account",
        }}
      />
      <MainTab.Screen
        name="Activity"
        component={RecipeStack}
        options={{
          tabBarIcon: "safe",
        }}
      />
      <MainTab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: "account-circle",
        }}
      />
    </MainTab.Navigator>
  );
}

const AppStack = createStackNavigator();

function Navigator() {
  return (
    <AppStack.Navigator
    headerMode="none">
      <AppStack.Screen name="Auth" component={AuthStack} />
      <AppStack.Screen name="App" component={MainTabNavigator} />
      <AppStack.Screen name="Loading" component={AuthLoading} />
    </AppStack.Navigator>
  );
}

export default function Router(props) {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
