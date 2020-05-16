import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, FlatList } from "react-native";
import { TextInput, Button, List, Avatar } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { getContacts } from "../../services/message";
import { useAuth } from "../../providers/auth";
import SnackBar from "../../components/SnackBar";
import { RECIPE_IMAGE_URL, USER_PROFILE_IMAGE_URL } from "../../constants";

export default function AddDescription({ navigation, route }) {
  const { state } = useAuth();

  const [contacts, setContacts] = useState([]);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });

  function hideSnackbar() {
    setSnackbar({ ...snackbar, visible: false });
  }

  useEffect(() => {
    let mounted = true;
    if (state.user?.id) {
      getContacts(state.user.id).then((response) => {
        if (response.error) {
          setSnackbar({
            visible: true,
            type: "error",
            message: response.message,
          });
        } else {
          setContacts(response.data);
        }
      });
    }

    return () => (mounted = false);
  }, []);

  function LeftContent(user) {
    return user.image ? (
      <Avatar.Image
        size={36}
        source={{ uri: `${USER_PROFILE_IMAGE_URL}/${user.image}` }}
      />
    ) : (
      <Avatar.Icon size={36} icon="face" />
    );
  }

  function sendMessage(receiver){
    console.log(receiver);
    navigation.navigate(  "ViewMessage",  {receiver} );
  }

  return (
    <>
      <ScrollView style={MainStyle.sceneContainer}>
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <List.Item
              title={ `${item.firstName} ${item.lastName}`}
              left={(item) => LeftContent(item) }
              right={() => <List.Icon icon="comment-arrow-right" />}
              style={ { backgroundColor: "#fff", borderBottomColor: "grey", borderWidth: 1, padding: 15, justifyContent:"center" } }
              onPress={ ()=> sendMessage(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
      <SnackBar
        visible={snackbar.visible}
        type={snackbar.type}
        message={snackbar.message}
        onClose={hideSnackbar}
      />
    </>
  );
}
