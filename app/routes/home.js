import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../components/Header";
import HomeScreen from "../scenes/home/Home";
import ViewRecipeScreen from "../scenes/recipe/ViewRecipe";

const HomeNav = createStackNavigator();

export default function HomeStack() {
  return (
    <HomeNav.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation}/>
        ),
      }}
    >
      <HomeNav.Screen name="Home" component={HomeScreen} />
      <HomeNav.Screen name="ViewHomeRecipe" component={ViewRecipeScreen} />
    </HomeNav.Navigator>
  );
}
