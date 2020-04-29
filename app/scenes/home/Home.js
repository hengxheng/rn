import React, {useState, useContext} from 'react';
import {Text, View, Button, ActivityIndicator, Alert} from 'react-native';

import { useAuth } from "../../providers/auth";

export default function Home(props) {
    const {navigate} = props.navigation;

    const {state, handleLogout} = useAuth();
    const user = state.user;
    
        return (
            (user)? (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
                <Text>{`Welcome ${user.firstName} ${user.lastName} (${user.nickname})`}</Text>
    
                <Button title={"Update Profile"} onPress={() => navigate('UpdateProfile')}/>
    
                <Button title={"Log Out"} onPress={() => {
                    handleLogout();
                    navigate('Auth');
                }}/>
            </View> )
            : ( navigate('Auth') )
        );
}