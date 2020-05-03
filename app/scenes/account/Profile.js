import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
import { ListItem, Input, Button } from "react-native-elements";
import Header from "../../components/Header";
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import { MessageText, ErrorText } from "../../components/Shared";
import { USER_PROFILE_IMAGE_URL } from "../../constants";
export default function Profile(props) {
  const { navigation } = props;
  //1 - DECLARE VARIABLES
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, updateUser } = useAuth();
  const [formData, setFormData] = useState({});
  const [avatar, setAvatar] = useState(null);
  const formFields = [
    { label: "First Name", field: "firstName", nav: "updateName" },
    { label: "Last Name", field: "lastName", nav: "updateName" },
    { label: "Username", field: "nickname", nav: "updateUsername" },
    { label: "Email", field: "email", nav: "updateEmail" },
    { label: "Password", field: "password", nav: "updatePassword" },
  ];

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setFormData({
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        nickname: state.user.nickname,
        email: state.user.email,
        image: state.user.image,
        password: "***",
      });

      setAvatar({
        url: state.user.image
      })
    }
    return () => (mounted = false);
  }, [state.user]);

  return (
    <>
      <Header titleText="My account" />
      <ScrollView style={styles.container}>
        <View>
          <ListItem
            key={"image"}
            leftAvatar={ (avatar === null)? ({ icon: { name: "user", type: "font-awesome", }}) : ({source: { uri: USER_PROFILE_IMAGE_URL+"/"+avatar.url }}) }
            title={`${formData.firstName} ${formData.lastName}`}
            subtitle={`${formData.firstName} ${formData.lastName}`}
            bottomDivider
            chevron
            button
            onPress={() => {navigation.navigate("updateProfileImage")}}
          />
          {formFields.map((item, i) => (
            <ListItem
              key={i}
              title={item.label + ": " + formData[item.field]}
              bottomDivider
              chevron
              button
              onPress={() => navigation.navigate(item.nav)}
            />
          ))}
        </View>

        <View style={{ flex: 1 }}>
          {error !== "" && <ErrorText error={error} />}
          {message !== "" && <MessageText message={message} />}
          <View style={styles.formContainer}>
            <Button
              icon={{
                type: "font-awesome",
                name: "sign-out",
                size: 20,
                color: "white",
              }}
              iconRight
              title="Logout"
              onPress={() => navigation.navigate("Logout")}
            />
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#00ff00" />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
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

Profile.navigationOptions = ({}) => {
  return {
    title: `Profile`,
  };
};
