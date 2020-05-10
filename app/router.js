import React from "react";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { CombinedDefaultTheme, CombinedDarkTheme } from "./theme";

//IMPORT ROUTES
import AuthStack from "./routes/Auth";
import HomeStack from "./routes/Home";
import RecipeStack from "./routes/Recipe";
import AccountStack from "./routes/Account";

import AuthLoading from "./scenes/auth/AuthLoading";
import AuthProvider from "./providers/auth";
import { MainStyle } from "./theme";

const MainTab = createMaterialBottomTabNavigator();

function MainTabNavigator() {
  const theme = useTheme();
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      activeColor="red"
      inactiveColor="grey"
      activeBackgroundColor= 'red'
      labeled={false}
      theme={theme}
      barStyle={ MainStyle.bottomTabBar }
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <MainTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: "home-account",
          tabBarLabel: "Home",
        }}
      />
      <MainTab.Screen
        name="Activity"
        component={RecipeStack}
        options={{
          tabBarIcon: "safe",
          tabBarLabel: "Activity",
        }}
      />
      <MainTab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: "account-circle",
          tabBarLabel: "Account",
        }}
      />
    </MainTab.Navigator>
  );
}

const AppStack = createStackNavigator();

function Main() {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Loading" component={AuthLoading} />
      <AppStack.Screen name="Auth" component={AuthStack} />
      <AppStack.Screen name="App" component={MainTabNavigator} />
    </AppStack.Navigator>
  );
}

export default function Router(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme; // Use Light/Dark theme based on a state

  function toggleTheme() {
    // We will pass this function to Drawer and invoke it on theme switch press
    setIsDarkTheme((isDark) => !isDark);
  }

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
