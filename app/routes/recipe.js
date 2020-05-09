import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//IMPORT SCENES
import ListRecipeScreen from "../scenes/recipe/ListRecipe";
import AddRecipeScreen from "../scenes/recipe/AddRecipe";
import UpdateRecipeScreen from "../scenes/recipe/UpdateRecipe";
import AddRecipeDescriptionScreen from "../scenes/recipe/AddDescription";
import AddRecipeImagesScreen from "../scenes/recipe/AddImages";
import AddRecipeTagsScreen from "../scenes/recipe/AddTags";
import ViewRecipeScreen from "../scenes/recipe/ViewRecipe";
import ShowCameraScreen from "../scenes/recipe/ShowCamera";
import Header from "../components/Header";

const AddRecipeNav = createStackNavigator();
function addRecipeStack() {
  return (
    <AddRecipeNav.Navigator headerMode="none">
      <AddRecipeNav.Screen name="AddRecipe" component={AddRecipeScreen} />
      <AddRecipeNav.Screen
        name="AddRecipeDescription"
        component={AddRecipeDescriptionScreen}
      />
      <AddRecipeNav.Screen
        name="AddRecipeImages"
        component={AddRecipeImagesScreen}
      />
      <AddRecipeNav.Screen
        name="AddRecipeTags"
        component={AddRecipeTagsScreen}
      />
    </AddRecipeNav.Navigator>
  );
}

const UpdateRecipeNav = createStackNavigator();
function updateRecipeStack() {
  return (
    <UpdateRecipeNav.Navigator headerMode="none">
      <UpdateRecipeNav.Screen
        name="UpdateRecipe"
        component={UpdateRecipeScreen}
      />
      <UpdateRecipeNav.Screen
        name="UpdateRecipeDescription"
        component={AddRecipeDescriptionScreen}
      />
      <UpdateRecipeNav.Screen
        name="UpdateRecipeImages"
        component={AddRecipeImagesScreen}
      />
      <UpdateRecipeNav.Screen
        name="UpdateRecipeTags"
        component={AddRecipeTagsScreen}
      />
    </UpdateRecipeNav.Navigator>
  );
}

const RecipeNav = createStackNavigator();
export default function RecipeStack() {
  return (
    <RecipeNav.Navigator
      initialRouteName="ListRecipe"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <RecipeNav.Screen name="ListRecipe" component={ListRecipeScreen} />
      <RecipeNav.Screen name="ViewRecipe" component={ViewRecipeScreen} />
      <RecipeNav.Screen name="fromCamera" component={ShowCameraScreen} />
      <RecipeNav.Screen name="AddRecipe" component={addRecipeStack} />
      <RecipeNav.Screen name="UpdateRecipe" component={updateRecipeStack} />
    </RecipeNav.Navigator>
  );
}
