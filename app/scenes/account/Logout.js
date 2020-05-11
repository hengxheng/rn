import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { useAuth } from "../../providers/auth";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { Text, FAB, IconButton } from "react-native-paper";
import CTA from "../../components/CTA";

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
        <View style={MainStyle.centerContainer}>
          <CTA title={"Do you want to sign out?"} style={{ marginTop: 20 }} />
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginVertical: 20,
            }}
          >
            <IconButton
              icon="check"
              color={Colors.primaryBtnColor}
              style={MainStyle.primaryBtn}
              size={20}
              onPress={() => onLogout()}
            />

            <IconButton
              icon="cancel"
              color={Colors.secondaryBtnColor}
              style={MainStyle.secondaryBtn}
              size={20}
              onPress={() => onCancel()}
            />
          </View>
        </View>
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
