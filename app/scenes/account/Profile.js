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
import { ListItem } from "react-native-elements";
import Header from "../../components/Header";
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import { MessageText, ErrorText } from "../../components/Shared";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default function Profile(props) {
  const { navigation } = props;

  //1 - DECLARE VARIABLES
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const { state, updateUser } = useAuth();
  const [formData, setFormData] = useState({});

  const formFields = [
    { label: "First Name", field: "firstName", nav: "updateName" },
    { label: "Last Name", field: "lastName", nav: "updateName" },
    { label: "Username", field: "nickname", nav: "updateUsername" },
    { label: "Email", field: "email", nav: "updateEmail" },
    { label: "Password", field: "password", nav: "updatePassword" },
  ];

  useEffect( () => {
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
    }
    return () => (mounted = false);
  },[state.user]);

  async function _pickImage() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setCameraPermission(true);
      }
    }

    if (!cameraPermission) {
      alert("Sorry, we need camera roll permissions to make this work!");
      return false;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
        setFormData({
          ...formData,
          image: {
            uri: result.uri,
            name: "userProfile.jpg",
            type: result.type,
          },
        });
      }
    } catch (E) {
      console.log(E);
    }
  }

  return (
    <>
      <Header titleText="My account" />
      <ScrollView style={styles.container}>
        <View>
          {formFields.map((item, i) => (
            <ListItem
              key={i}
              title={item.label+": "+formData[item.field]}
              // leftIcon={{ name: "arrow-right" }}
              bottomDivider
              chevron
              button
              onPress={ () => navigation.navigate(item.nav)}
            />
          ))}
        </View>

        <View style={{ flex: 1 }}>
          {error !== "" && <ErrorText error={error} />}
          {message !== "" && <MessageText message={message} />}
          <View style={styles.formContainer}>
            <View style={styles.photoContainer}>
              {formData.image ? (
                <Image
                  source={{ uri: formData.image.uri }}
                  style={{ height: 200, width: null, left: 0, right: 0 }}
                />
              ) : (
                <View />
              )}
            </View>
            <View style={styles.input}>
              <Button
                icon={{
                  type: "font-awesome",
                  name: "camera",
                  size: 20,
                  color: "white",
                }}
                iconRight
                title="Take a photo"
                onPress={() => {
                  _pickImage();
                }}
              />
            </View>
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
  photoContainer: {
    flex: 1,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height / 2,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderColor: "#fff",
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

Profile.navigationOptions = ({}) => {
  return {
    title: `Profile`,
  };
};
