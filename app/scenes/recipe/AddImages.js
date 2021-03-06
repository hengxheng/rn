import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from "react-native";
import { Button, FAB } from "react-native-paper";
import ImageModal from "../../components/ImageModal";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";

export default function AddImages({ navigation, route }) {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const imagePlaceholder = require("../../../assets/image-placeholder.png");
  const [returnURL, setReturnURL] = useState("AddRecipe");
  const [cameraReturnScreen, setCameraReturnScreen] = useState(
    "AddRecipeImages"
  );

  useEffect(() => {
    if (route.params?.images) {
      const _selectedImages = route.params.images;
      setSelectedImages([...selectedImages, ..._selectedImages]);
    }

    if (route.params?.update === true) {
      setReturnURL("UpdateRecipe");
      setCameraReturnScreen("UpdateRecipeImages");
    }
  }, [route.params]);

  useEffect(() => {
    const _images = [...selectedImages];
    for (let i = 0; i < 6 - selectedImages.length; i++) {
      _images.push(imagePlaceholder);
    }
    setImages([..._images]);
  }, [selectedImages]);

  function changeImageSource(source) {
    if (source !== null) {
      if (source === "camera") {
        _openCamera();
      } else if (source === "cameraRoll") {
        _pickImage();
      }
    }
    setImageModalVisible(false);
  }

  function closeImageModal() {
    setImageModalVisible(false);
  }

  function addImages(img) {
    const _selectedImage = img;
    setSelectedImages([...selectedImages, _selectedImage]);
  }

  function removeImage(img) {
    const _selectedImages = [...selectedImages];
    let k = null;
    _selectedImages.map((s, index) => {
      if (s.uri === img.uri) {
        k = index;
      }
    });
    _selectedImages.splice(k, 1);
    setSelectedImages(_selectedImages);
  }

  async function _pickImage() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        Alert("Sorry, we need camera roll permissions to make this work!");
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
      console.log(result);
      if (!result.cancelled) {
        addImages(result);
      }
    } catch (E) {
      console.log(E);
    }
  }

  async function _openCamera() {
    navigation.navigate("fromCamera", { returnScreen: cameraReturnScreen });
  }

  return (
    <>
      <ScrollView style={MainStyle.sceneContainer}>
        <View style={styles.imgContainer}>
          {images.map((img, index) => {
            return (
              <TouchableHighlight
                key={index}
                onPress={() => setImageModalVisible(true)}
                onLongPress={() => removeImage(img)}
              >
                <Image
                  style={styles.image}
                  source={img}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              </TouchableHighlight>
            );
          })}
        </View>

        <ImageModal
          visible={imageModalVisible}
          changeImageSource={changeImageSource}
          onClose={closeImageModal}
        />
      </ScrollView>
      <FAB
        style={MainStyle.fab}
        small
        icon="check"
        color="#fff"
        onPress={() =>
          navigation.navigate(returnURL, {
            images: selectedImages,
            imageChanged: true,
          })
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
});
