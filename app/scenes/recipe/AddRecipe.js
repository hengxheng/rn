import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Card, Button, Chip, FAB } from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";
import SnackBar from "../../components/SnackBar";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { createOrUpdateRecipe } from "../../services/app";
import { useAuth } from "../../providers/auth";

export default function AddRecipe({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });
  const { handleLogout } = useAuth();

  useEffect(() => {
    if (route.params?.content) {
      setContent(route.params.content);
    }

    if (route.params?.tags) {
      setTags(route.params.tags);
    }

    if (route.params?.images) {
      setImages(route.params.images);
    }
  }, [route.params]);

  function hideSnackbar() {
    setSnackbar({ ...snackbar, visible: false });
  }

  function conventImageObject(img) {
    let localUri =
      Platform.OS === "android" ? img.uri : img.uri.replace("file://", "");
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    return { uri: localUri, name: filename, type: type };
  }

  async function onSave() {
    const data = new FormData();

    const imgs = images.map((i) => {
      return conventImageObject(i);
    });
    imgs.map((img) => {
      data.append("images", img);
    });

    data.append("title", title);
    data.append("content", content);
    data.append("tags", JSON.stringify(tags));

    const response = await createOrUpdateRecipe(data);
    if (response.error) {
      setSnackbar({
        visible: true,
        type: "error",
        message: response.message,
      });
      await handleLogout();
      navigation.navigate("Auth");
    } else {
      setSnackbar({
        visible: true,
        type: "info",
        message: "Recipe is added",
      });
      navigation.navigate("ListRecipe");
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRightIcon: "check",
      headerRight: onSave,
    });
  }, [navigation, onSave]);

  return (
    <>
      <ScrollView style={{ ...MainStyle.sceneContainer, paddingHorizontal: 0 }}>
        <View style={MainStyle.inputCard}>
          <TextInput
            label="Title"
            value={title}
            mode="flat"
            onChangeText={setTitle}
            selectionColor={Colors.green}
            underlineColor={Colors.green}
            style={MainStyle.textInput}
          />
        </View>
        {content !== "" && (
          <View style={MainStyle.inputCard}>
            <TextInput
              label="Desciption"
              value={content}
              mode="flat"
              multiline
              selectionColor={Colors.green}
              underlineColor={Colors.green}
              style={MainStyle.textInput}
              disabled
            />
          </View>
        )}
        <View style={MainStyle.inputCard}>
          <Button
            icon="pencil"
            mode="contained"
            compact={false}
            style={MainStyle.innerButton}
            onPress={() =>
              navigation.navigate("AddRecipeDescription", {
                content: content,
              })
            }
          >
            {content !== "" ? "Edit" : "Add"} description
          </Button>
        </View>

        {images && (
          <View style={{ paddingBottom: 10 }}>
            <SliderBox images={images} />
          </View>
        )}

        <View style={MainStyle.inputCard}>
          <Button
            icon="camera"
            mode="contained"
            compact={false}
            style={MainStyle.innerButton}
            onPress={() =>
              navigation.navigate("AddRecipeImages", {
                images: images,
              })
            }
          >
            {images ? "Edit" : "Add"} images
          </Button>
        </View>

        {tags.length > 0 && (
          <View style={MainStyle.tagContainer}>
            {tags.map((tag, index) => {
              return (
                <Chip key={index} style={MainStyle.tagBox} icon="tag">
                  {tag}
                </Chip>
              );
            })}
          </View>
        )}
        <View style={{ ...MainStyle.inputCard, marginBottom: 50 }}>
          <Button
            icon="tag"
            mode="contained"
            compact={false}
            style={MainStyle.innerButton}
            onPress={() =>
              navigation.navigate("AddRecipeTags", {
                tags: tags,
              })
            }
          >
            {tags ? "Edit" : "Add"} tags
          </Button>
        </View>
      </ScrollView>
      <FAB
        style={MainStyle.fab}
        small
        icon="check"
        color="#fff"
        disabled={title == "" ? true : false}
        onPress={() => onSave()}
      />
      <SnackBar
        visible={snackbar.visible}
        type={snackbar.type}
        message={snackbar.message}
        onClose={hideSnackbar}
      />
    </>
  );
}
