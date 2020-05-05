import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Header from "../../components/Header";

export default function AddImages(props) {
  const navigation = props.navigation;
  const [images, setImages] = useState([
    { uri: "" },
    { uri: "" },
    { uri: "" },
    { uri: "" },
    { uri: "" },
    { uri: "" },
  ]);

  useEffect(() => {
    const _images = navigation.getParam("images", null);
    if (_images) {
      setImages(_images);
    }
  }, [navigation.state.params]);
  return (
    <>
      <Header titleText="Add recipe" />
      <ScrollView style={styles.container}>
        <View style={styles.imgContainer}>
          {images.map((img, index) => {
            return (
              <TouchableHighlight
                key={index}
                onPress={() => navigation.navigate("ShowCamera")}
                onLongPress={() => alert("Delete")}
              >
                <Image
                  style={styles.image}
                  source={
                    img.uri !== ""
                      ? img.uri
                      : require("../../../assets/image-placeholder.png")
                  }
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
            onPress={() => navigation.navigate("AddRecipe", { images: images })}
          >
            Submit
          </Button>
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
