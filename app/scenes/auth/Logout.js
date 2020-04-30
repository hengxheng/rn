import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useAuth } from "../../providers/auth";
import Header from "../../components/Header";

export default function Logout(props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleLogout } = useAuth();

  async function onLogout() {
    setLoading(true);
    try {
      await handleLogout();
      setLoading(false);
      props.navigation.navigate("Auth");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  async function onCancel() {
    props.navigation.navigate("Home");
  }

  return (
    <>
      <Header titleText={"Log out"} />
      <View style={styles.container}>
        <Text>Do you want to logout?</Text>
        <Button title={"Log Out"} onPress={() => onLogout()} />
        <Button title={"Cancel"} onPress={() => onCancel()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center', 
    justifyContent: 'center',
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
});
