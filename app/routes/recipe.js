import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import ListRecipeScreen from "../scenes/recipe/ListRecipe";
import AddRecipeScreen from "../scenes/recipe/AddRecipe";
import AddRecipeDescriptionScreen from "../scenes/recipe/AddDescription";
import AddRecipeImagesScreen from "../scenes/recipe/AddImags";
import AddRecipeTagsScreen from "../scenes/recipe/AddTags";
import {headerStyle, headerTitleStyle} from '../theme'

const RecipeStack = createStackNavigator(
    {
        ListRecipe: ListRecipeScreen,
        AddRecipe: AddRecipeScreen,
        AddRecipeDescription: AddRecipeDescriptionScreen,
        AddRecipeImages: AddRecipeImagesScreen,
        AddRecipeTags: AddRecipeTagsScreen,
    },
    {
        initialRouteName: 'ListRecipe',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default RecipeStack;