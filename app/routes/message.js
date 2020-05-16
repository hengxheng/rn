import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//IMPORT SCENES
import ContactsScreen from "../scenes/message/Contacts";
import ViewMessageScreen from "../scenes/message/ViewMessages";
import Header from "../components/Header";

const MessageNav = createStackNavigator();

export default function MessageStack() {
  return (
    <MessageNav.Navigator
      initialRouteName="ContactsScreen"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <MessageNav.Screen name="Contacts" component={ContactsScreen} />
      <MessageNav.Screen name="ViewMessage" component={ViewMessageScreen} />
    </MessageNav.Navigator>
  );
}
