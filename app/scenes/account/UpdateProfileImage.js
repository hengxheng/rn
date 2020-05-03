import React, { useState, useEffect } from "react";
import { Platform, ActivityIndicator, View, StyleSheet } from "react-native";
import Header from "../../components/Header";
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import { MessageText, ErrorText } from "../../components/Shared";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Avatar } from "react-native-elements";
import { USER_PROFILE_IMAGE_URL } from "../../constants";

export default function UpdateProfileImage(props) {
  const { navigation } = props;

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, updateUser } = useAuth();
  const [avatar, setAvatar] = useState(null);

  useEffect( () => {
    setAvatar({ uri: USER_PROFILE_IMAGE_URL+"/"+state.user.image });
  }, [state.user]);

  async function _pickImage() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return false;
      }
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        setAvatar({ uri: localUri, name: filename, type: type });
      }
    } catch (E) {
      console.log(E);
    }
  }

  async function onSubmit() {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const data = new FormData();
      data.append("avatar", {
        name: avatar.name,
        type: avatar.type,
        uri:
          Platform.OS === "android"
            ? avatar.uri
            : avatar.uri.replace("file://", ""),
      });

      let response = await api.updateProfileImage(state.user.id, data);
      updateUser({ ...state.user, image: response.filePath });
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
      <View style={styles.container}>
        {error !== "" && <ErrorText error={error} />}
        {message !== "" && <MessageText message={message} />}
        <View style={styles.formContainer}>
          <View style={styles.photoContainer}>
            {avatar ? (
              <Avatar
                rounded
                source={{
                  uri: avatar.uri,
                }}
                style={styles.avatar}
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
          <View style={styles.input}>
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
  photoContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 30,
  },
  avatar: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
});

UpdateProfileImage.navigationOptions = ({}) => {
  return {
    title: `Update Name`,
  };
};
