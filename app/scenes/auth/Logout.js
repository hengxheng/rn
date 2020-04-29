import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../providers/auth";
import { Header, ErrorText } from "../../components/Shared";

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
    <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: "#fff" }}>
      <Header title={"Log out"} />
      <View style={{ flex: 1 }}>
        <ErrorText error={error} />
      </View>
      <Text>Do you want to logout?</Text>
      <Button title={"Log Out"} onPress={() => onLogout()} />
      <Button title={"Cancel"} onPress={() => onCancel()} />
    </View>
  );
}
