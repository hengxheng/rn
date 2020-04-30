import React, { useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { StackActions } from "react-navigation";

import { useAuth } from "../../providers/auth";

export default function AuthLoading(props) {
  const { navigate } = props.navigation;
  const { getAuthState } = useAuth();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      initialize();
    }
    return () => (mounted = false);
  }, []);

  async function initialize() {
    try {
      const { user } = await getAuthState();

      if (user) {
        navigate("App");
      } 
      else {
        navigate("Auth");
      }
    } catch (e) {
      navigate("Auth");
    }
  }

  return (
    <View
      style={{
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <ActivityIndicator />
      <Text>{"Loading User Data"}</Text>
    </View>
  );
}
