import React, { useState, useEffect } from "react";
import {
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from "react-native";
import Header from "../../components/Header";
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import { MessageText, ErrorText } from "../../components/Shared";
import { Input, Button, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarUpdated, setAvatarUpdated] = useState(false);

  function conventAvatar(avatar) {
    let localUri = avatar.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    return { uri: localUri, name: filename, type: type };
  }

  useEffect(() => {
    const photo = navigation.getParam("photo", null); // from camera

    if (photo) {
      setAvatar(conventAvatar(photo));
      setAvatarUpdated(true);
    } else {
      setAvatar({ uri: USER_PROFILE_IMAGE_URL + "/" + state.user.image });
    }
  }, [state.user, navigation.state.params]);

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
        setAvatar(conventAvatar(result));
        setModalVisible(false);
        setAvatarUpdated(true);
      }
    } catch (E) {
      console.log(E);
    }
  }

  async function _openCamera() {
    setModalVisible(false);
    navigation.navigate("showCamera", { onSelect: null });
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
                size="medium"
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
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text style={styles.textStyle}>Choose a new image</Text>
              <Icon
                name="camera"
                type="font-awesome"
                style={styles.touchableIcon}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {avatarUpdated && (
            <View style={styles.input}>
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={() => {
                  onSubmit();
                }}
              >
                <Text style={styles.textStyle}>Update</Text>
                <Icon
                  name="pencil-square-o"
                  type="font-awesome"
                  style={styles.touchableIcon}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
                style={{ ...styles.modalButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  _openCamera();
                }}
              >
                <Text style={styles.textStyle}>Take a photo</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...styles.modalButton,
                  backgroundColor: "#2196F3",
                  marginBottom: 25,
                }}
                onPress={() => {
                  _pickImage();
                }}
              >
                <Text style={styles.textStyle}>From Camera roll</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.modalButton }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    padding: 15,
    alignItems: "center",
    elevation: 5,
    alignSelf: "stretch",
  },
  modalButton: {
    backgroundColor: "grey",
    alignSelf: "stretch",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  touchableButton: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    padding: 10,
  },
  touchableIcon: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
});

UpdateProfileImage.navigationOptions = ({}) => {
  return {
    title: `Update Name`,
  };
};
