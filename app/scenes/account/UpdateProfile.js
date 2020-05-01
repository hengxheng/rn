import React, { useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import Header from "../../components/Header";
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import { MessageText, ErrorText } from "../../components/Shared";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function UpdateProfile(props) {
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
      <Header titleText="My account" />
      <Icon
        name="sign-out"
        size={25}
        onPress={() => props.navigation.navigate("Logout")}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {error !== "" && <ErrorText error={error} />}
          {message !== "" && <MessageText message={message} />}
          <View>
            <Input
              label="First name"
              inputContainerStyle={styles.input}
              value={formData.firstName}
              onChangeText={(value) =>
                setFormData({ ...formData, firstName: value })
              }
            />
            <Input
              label="Last name"
              inputContainerStyle={styles.input}
              value={formData.lastName}
              onChangeText={(value) =>
                setFormData({ ...formData, lastName: value })
              }
            />
            <Input
              label="Nickname"
              inputContainerStyle={styles.input}
              value={formData.nickname}
              onChangeText={(value) =>
                setFormData({ ...formData, nickname: value })
              }
            />
            <Input
              label="Email"
              inputContainerStyle={styles.input}
              value={formData.email}
              onChangeText={(value) =>
                setFormData({ ...formData, email: value })
              }
            />
            <Input
              label="Password"
              inputContainerStyle={styles.input}
              secureTextEntry={true}
              onChangeText={(value) =>
                setFormData({ ...formData, password: value })
              }
            />
            <Button
              icon={{
                type: "font-awesome",
                name: "arrow-right",
                size: 15,
                color: "white",
              }}
              iconRight
              title="Update"
              onPress={() => {
                onSubmit();
              }}
            />
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#00ff00" />
              </View>
            )}
          </View>
        </View>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  iconButton: {
    backgroundColor: "transparent",
    color: "#fff",
    position: "absolute",
    right: 0,
    top: 5,
    margin: 10,
  },
  input: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});

UpdateProfile.navigationOptions = ({}) => {
  return {
    title: `Update Profile`,
  };
};
