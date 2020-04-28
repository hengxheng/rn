import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import ListRecipeScreen from "../scenes/recipe/ListRecipe";
import AddRecipeScreen from "../scenes/recipe/AddRecipe";

import {headerStyle, headerTitleStyle} from '../theme'

const RecipeStack = createStackNavigator(
    {
        ListRecipe: ListRecipeScreen,
        AddRecipe: AddRecipeScreen,
    },
    {
        initialRouteName: 'ListRecipe',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default RecipeStack;