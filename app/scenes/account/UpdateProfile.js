import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/Header";
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import { IconButton } from "react-native-paper";
import Form from "react-native-basic-form";
import { ErrorText } from "../../components/Shared";

export default function UpdateProfile(props) {
  const { navigation } = props;

  //1 - DECLARE VARIABLES
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state, updateUser } = useAuth();

  const fields = [
    {
      name: "firstName",
      label: "First Name",
      required: true,
      value: state.user.firstName,
    },
    {
      name: "lastName",
      label: "Last Name",
      required: true,
      value: state.user.lastName,
    },
    {
      name: "nickname",
      label: "Username",
      required: true,
      value: state.user.nickname,
    },
    { name: "email", label: "Email", required: true, value: state.user.email },
    {
      name: "password",
      label: "Password",
      required: false,
      value: state.user.password,
    },
  ];

  async function onSubmit(data) {
    setLoading(true);

    try {
      let response = await api.updateProfile(state.user.id, data);
      updateUser(response.user);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  let formProps = { title: "Submit", fields, onSubmit, loading };
  return (
    <>
      <Header titleText="My account" />
      <IconButton
          icon="minus"
          size={25}
          color="white"
          onPress={() => props.navigation.navigate('Logout')}
          style={styles.iconButton}
        />
      <View style={styles.container}>   
        <View style={{ flex: 1 }}>
          <ErrorText error={error} />
          <Form {...formProps} />
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
  iconButton: {
    backgroundColor: "rgba(46, 113, 102, 0.8)",
    position: "absolute",
    right: 0,
    top: 5,
    margin: 10,
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
