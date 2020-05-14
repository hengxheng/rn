import React, { useState } from "react";
import { View } from "react-native";
import { useAuth } from "../../providers/auth";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { IconButton } from "react-native-paper";
import CTA from "../../components/CTA";

export default function Logout(props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleLogout } = useAuth();

  async function onLogout() {
    const navigation = props.navigation;
    setLoading(true);
    try {
      await handleLogout();
      navigation.navigate("Auth", {
        screen: "Login",
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  async function onCancel() {
    navigation.goBack();
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
