import React, { useState } from "react";
import { Alert, View } from "react-native";
import * as api from "../../services/auth";
import CTA from "../../components/CTA";
import Loading from "../../components/Loading";
import { TextInput, Button } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import SnackBar from "../../components/SnackBar";

export default function Register({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    try {
      const data = {
        firstName,
        lastName,
        email,
        password,
      };
      let response = await api.register(data);
      setLoading(false);
      Alert.alert(
        "Registration Successful",
        response.message,
        [{ text: "OK", onPress: () => navigation.replace("Login") }],
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
          label="First Name"
          value={firstName}
          mode="flat"
          onChangeText={(value) => setFirstName(value)}
          selectionColor="#3cc68a"
          underlineColor="#3cc68a"
          style={MainStyle.textInput}
        />
        <TextInput
          label="Last Name"
          value={lastName}
          mode="flat"
          onChangeText={(value) => setLastName(value)}
          selectionColor="#3cc68a"
          underlineColor="#3cc68a"
          style={MainStyle.textInput}
        />
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
        <Button icon="security" mode="contained" onPress={() => onSubmit()}>
          Register
        </Button>

        {loading && <Loading />}

        <CTA
          title={"Already have an account?"}
          ctaText={"Login"}
          onPress={() => navigation.replace("Login")}
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
