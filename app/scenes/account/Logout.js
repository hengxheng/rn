import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useAuth } from "../../providers/auth";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";

export default function Logout(props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleLogout } = useAuth();

  async function onLogout() {
    setLoading(true);
    try {
      await handleLogout();
      props.navigation.navigate("Auth");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  async function onCancel() {
    props.navigation.goBack();
  }

  return (
    <>
      <View style={MainStyle.sceneContainer}>
        <Text>Do you want to logout?</Text>
        <Button title={"Log Out"} onPress={() => onLogout()} />
        <Button title={"Cancel"} onPress={() => onCancel()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
});
