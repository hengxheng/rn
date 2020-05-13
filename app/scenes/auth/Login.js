import React, { useState } from "react";
import { View } from "react-native";

import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import CTA from "../../components/CTA";
import Loading from "../../components/Loading";
import { TextInput, Button } from "react-native-paper";
import SnackBar from "../../components/SnackBar";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });

  async function onSubmit() {
    setLoading(true);
    try {
      const data = {
        email,
        password,
      };
      let response = await api.login(data);
      await handleLogin(response);
      setLoading(false);
      navigation.navigate("App");
    } catch (error) {
      setSnackbar({
        visible: true,
        type: "error",
        message: error.message,
      });
      setLoading(false);
    }
  }

  function hideSnackbar() {
    setSnackbar({ ...snackbar, visible: false });
  }

  return (
    <View style={{ ...MainStyle.sceneContainer, flex: 1 }}>
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
        <TextInput
          label="Password"
          secureTextEntry
          password
          mode="flat"
          value={password}
          onChangeText={(value) => setPassword(value)}
          selectionColor="#3cc68a"
          underlineColor="#3cc68a"
          style={MainStyle.textInput}
        />
        <Button icon="login" mode="contained" onPress={() => onSubmit()}>
          Login
        </Button>

        {loading && <Loading />}

        <CTA
          ctaText={"Forgot Password?"}
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{ marginTop: 20 }}
        />

        <CTA
          title={"Don't have an account?"}
          ctaText={"Register"}
          onPress={() => navigation.replace("Register")}
          style={{ marginTop: 50 }}
        />

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
