import React, { useState, useEffect } from "react";
import {
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import { MessageText, ErrorText } from "../../components/Shared";
import ImageModal from "../../components/ImageModal";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Avatar } from "react-native-elements";
import { USER_PROFILE_IMAGE_URL } from "../../constants";
import Loading from "../../components/Loading";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";

export default function UpdateProfileImage({ navigation, route }) {
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
    let photo = null;
    if (route.params?.photo) {
      photo = route.params.photo;
    }

    if (photo) {
      setAvatar(conventAvatar(photo));
      setAvatarUpdated(true);
    } else {
      setAvatar({ uri: USER_PROFILE_IMAGE_URL + "/" + state.user.image });
    }
  }, [state.user, route.params]);

  function changeImageSource(source) {
    if (source !== null) {
      if (source === "camera") {
        _openCamera();
      } else if (source === "cameraRoll") {
        _pickImage();
      }
    }
  }

  function closeImageModal() {
    setModalVisible(false);
  }

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

    if(state.user?.id){
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
  }

  return (
    <>
      <View style={MainStyle.sceneContainer}>
        <View style={MainStyle.formContainer}>
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

        {loading && <Loading />}

        <ImageModal
          visible={modalVisible}
          changeImageSource={changeImageSource}
          onClose={closeImageModal}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
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
