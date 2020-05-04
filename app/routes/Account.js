import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import LogoutScreen from "../scenes/account/Logout";
import ProfileScreen from "../scenes/account/Profile";
import UpdateEmailScreen from "../scenes/account/UpdateEmail";
import UpdateNameScreen from "../scenes/account/UpdateName";
import UpdateUsernameScreen from "../scenes/account/UpdateUsername";
import UpdatePasswordScreen from "../scenes/account/UpdatePassword";
import UpdateProfileImageScreen from "../scenes/account/UpdateProfileImage";
import ShowCameraScreen from "../scenes/account/ShowCamera";
import {headerStyle, headerTitleStyle} from '../theme';

//Create Routes
const AccountStack = createStackNavigator(
    {
        Profile: ProfileScreen,
        updateName: UpdateNameScreen,
        updateUsername: UpdateUsernameScreen,
        updatePassword: UpdatePasswordScreen,
        updateEmail: UpdateEmailScreen,
        updateProfileImage: UpdateProfileImageScreen,
        showCamera: ShowCameraScreen,
        Logout: LogoutScreen,
    },
    {
        initialRouteName: 'Profile',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default AccountStack;