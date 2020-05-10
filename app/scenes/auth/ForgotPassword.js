import React, { useState } from "react";
import { Alert, View } from "react-native";
import * as api from "../../services/auth";
import CTA from "../../components/CTA";
import Loading from "../../components/Loading";
import { TextInput, Button } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import SnackBar from "../../components/SnackBar";

export default function ForgotPassword({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });

  function hideSnackbar() {
    setSnackbar({ ...snackbar, visible: false });
  }

  async function onSubmit() {
    setLoading(true);
    const data = {
      email,
    };
    try {
      let response = await api.forgotPassword(data);
      setLoading(false);

      Alert.alert(
        "Recover Password",
        response.message,
        [{ text: "OK", onPress: () => navigation.goBack() }],
        { cancelable: false }
      );
    } catch (error) {
      setSnackbar({
        visible: true,
        type: "error",
        message: error.message,
      });
      setLoading(false);
    }
  }

  return (
    <View style={MainStyle.sceneContainer}>
      <View style={MainStyle.centerContainer}>
        <TextInput
          label="Email"
          value={email}
          mode="flat"
          onChangeText={(value) => setEmail(value)}
          selectionColor="#3cc68a"
          underlineColor="#3cc68a"
          style={MainStyle.textInput}
        />
        <CTA
          title={"Send reset password to your email"}
          style={{ marginVertical: 10 }}
        />
        <Button icon="security" mode="contained" onPress={() => onSubmit()}>
          Send
        </Button>

        {loading && <Loading />}
        <SnackBar
          visible={snackbar.visible}
          type={snackbar.type}
          message={snackbar.message}
          onClose={hideSnackbar}
        />
      </View>
    </View>
  );
}
