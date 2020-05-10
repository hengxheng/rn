import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { ListItem, Button } from "react-native-elements";
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
        <View>
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

        <View style={{ flex: 1 }}>
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
          </View>
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
