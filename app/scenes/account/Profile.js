import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { ListItem } from "react-native-elements";
import { Button } from "react-native-paper";
import { useAuth } from "../../providers/auth";
import { USER_PROFILE_IMAGE_URL } from "../../constants";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";

export default function Profile(props) {
  const { navigation } = props;
  const { state } = useAuth();
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
      if (state.user !== null) {
        setFormData({
          firstName: state.user.firstName,
          lastName: state.user.lastName,
          nickname: state.user.nickname,
          email: state.user.email,
          image: state.user.image,
          password: "***",
        });

        setAvatar({
          url: state.user.image,
        });
      }
    }
    return () => (mounted = false);
  }, [state.user]);

  return (
    <>
      <ScrollView style={MainStyle.sceneContainer}>
        <View style={ {marginBottom: 20} }>
          <ListItem
            key={"image"}
            leftAvatar={
              avatar === null
                ? { icon: { name: "user", type: "font-awesome" } }
                : { source: { uri: USER_PROFILE_IMAGE_URL + "/" + avatar.url } }
            }
            title={`${formData.firstName} ${formData.lastName}`}
            subtitle={`${formData.firstName} ${formData.lastName}`}
            bottomDivider
            chevron
            button
            onPress={() => {
              navigation.navigate("updateProfileImage");
            }}
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

        <View style={MainStyle.inputCard}>
          <Button
            style={MainStyle.innerButton2}
            mode="contained"
            icon="logout-variant"
            title="Logout"
            onPress={() => navigation.navigate("Logout")}
          >
            Sign out
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
});

Profile.navigationOptions = ({}) => {
  return {
    title: `Profile`,
  };
};
