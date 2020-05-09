import React, { useState } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import { MessageText, ErrorText } from "../../components/Shared";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function UpdateUsername(props) {
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
    try {
      let response = await api.updateProfile(state.user.id, data);
      updateUser(response.user);
      setMessage(response.message);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <View style={styles.container}>
        {error !== "" && <ErrorText error={error} />}
        {message !== "" && <MessageText message={message} />}
        <View style={styles.formContainer}>
          <Input
            label="Username"
            inputContainerStyle={styles.input}
            value={formData.nickname}
            onChangeText={(value) =>
              setFormData({ ...formData, nickname: value })
            }
          />
          <Button
            icon={{
              type: "font-awesome",
              name: "pencil-square-o",
              size: 20,
              color: "white",
            }}
            iconRight
            title="Update"
            onPress={() => {
              onSubmit();
            }}
          />
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 120,
  },
  formContainer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
});

UpdateUsername.navigationOptions = ({}) => {
  return {
    title: `Update Profile`,
  };
};
