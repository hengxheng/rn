import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import  Loading from "../../components/Loading";
import { TextInput } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";

export default function UpdateName(props) {
  const { navigation } = props;

  //1 - DECLARE VARIABLES
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    nickname: state.user.nickname,
    email: state.user.email,
    image: state.user.image,
    password: "",
  });

  async function onSubmit() {
    setLoading(true);
    setMessage("");
    setError("");
    let data = formData;
    if(state.user?.id){
      try {
        let response = await api.updateProfile(state.user.id, data);
        updateUser(response.user);
        setMessage(response.message);
        setLoading(false);
        navigation.navigate("Profile");
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRightIcon: "check",
      headerRight: onSubmit,
    });
  }, [navigation, onSubmit]);

  return (
    <>
      <View style={MainStyle.sceneContainer}>
        <View style={MainStyle.formContainer}>
          <TextInput
            label="First name"
            value={formData.firstName}
            mode="flat"
            onChangeText={(value) =>
              setFormData({ ...formData, firstName: value })
            }
            selectionColor="#3cc68a"
            underlineColor="#3cc68a"
            style={MainStyle.textInput}
          />
          <TextInput
            label="Last name"
            value={formData.lastName}
            mode="flat"
            onChangeText={(value) =>
              setFormData({ ...formData, lastName: value })
            }
            selectionColor="#3cc68a"
            underlineColor="#3cc68a"
            style={MainStyle.textInput}
          />
        </View>

        {loading && (
          <Loading />
        )}
      </View>
    </>
  );
}