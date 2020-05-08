import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

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

const AccountNav = createStackNavigator();

export default function AccountStack() {
    return (
        <AccountNav.Navigator>
            <AccountNav.Screen name="Profile" component={ProfileScreen} />
            <AccountNav.Screen name="updateName" component={UpdateNameScreen} />
            <AccountNav.Screen name="updateUsername" component={UpdateUsernameScreen} />
            <AccountNav.Screen name="updatePassword" component={UpdatePasswordScreen} />
            <AccountNav.Screen name="updateEmail" component={UpdateEmailScreen} />
            <AccountNav.Screen name="updateProfileImage" component={UpdateProfileImageScreen} />
            <AccountNav.Screen name="showCamera" component={ShowCameraScreen} />
            <AccountNav.Screen name="Logout" component={LogoutScreen} />
        </AccountNav.Navigator>
    )
}