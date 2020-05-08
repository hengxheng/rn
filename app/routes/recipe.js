import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import ListRecipeScreen from "../scenes/recipe/ListRecipe";
import AddRecipeScreen from "../scenes/recipe/AddRecipe";
import UpdateRecipeScreen from "../scenes/recipe/UpdateRecipe";
import AddRecipeDescriptionScreen from "../scenes/recipe/AddDescription";
import AddRecipeImagesScreen from "../scenes/recipe/AddImages";
import AddRecipeTagsScreen from "../scenes/recipe/AddTags";
import ShowCameraScreen from "../scenes/recipe/ShowCamera";
import {headerStyle, headerTitleStyle} from '../theme';


const addRecipeStack = createStackNavigator(
    {

        AddRecipe: AddRecipeScreen,
        UpdateRecipe: UpdateRecipeScreen,
        AddRecipeDescription: AddRecipeDescriptionScreen,
        AddRecipeImages: AddRecipeImagesScreen,
        AddRecipeTags: AddRecipeTagsScreen,
        fromCamera: ShowCameraScreen,
    },
    {
        initialRouteName: 'AddRecipe',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

const RecipeStack = createStackNavigator(
    {
        ListRecipe: ListRecipeScreen,
        AddRecipe: {
            screen: addRecipeStack,
            navigationOptions:{
                headerShown: false,
                  tabBarVisible: false,
                 }
        }
    },
    {
        initialRouteName: 'ListRecipe',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default RecipeStack;