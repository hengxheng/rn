import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { Button } from "react-native-paper";
import Header from "../../components/Header";
import ImageModal from "../../components/ImageModal";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function AddImages(props) {
  const navigation = props.navigation;
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const imagePlaceholder = require("../../../assets/image-placeholder.png");
  const [returnURL, setReturnURL] = useState("AddRecipe");

  useEffect(() => {
    const _selectedImages = navigation.getParam("images", []);
    if (_selectedImages) {
      setSelectedImages([...selectedImages, ..._selectedImages]);
    }

    if (navigation.getParam("update", false) === true){
      setReturnURL("UpdateRecipe");
    }
  }, [navigation.state.params]);

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
        setImageModalVisible(false);
        addImages(result);
      }
    } catch (E) {
      console.log(E);
    }
  }

  async function _openCamera() {
    setImageModalVisible(false);
    navigation.navigate("fromCamera");
  }

  return (
    <>
      <Header titleText="Add recipe" />
      <ScrollView style={styles.container}>
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

        <View>
          <Button
            style={styles.submitButton}
            mode="contained"
            icon="check"
            onPress={() =>
              navigation.navigate(returnURL, { images: selectedImages })
            }
          >
            Submit
          </Button>
        </View>

        <ImageModal
          visible={imageModalVisible}
          changeImageSource={changeImageSource}
          onClose={closeImageModal}
        />
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
  imgContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 25,
  },
});
