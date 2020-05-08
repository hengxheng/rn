import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Card, Button, Chip } from "react-native-paper";
import Header from "../../components/Header";
import { AsyncStorage } from "react-native";
import axios from "axios";
import * as c from "../../constants";
import { SliderBox } from "react-native-image-slider-box";
import SnackBar from "../../components/SnackBar";

export default function UpdateRecipe({ navigation }) {
  const [recipeId, setRecipeId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });

  useEffect(() => {
    setRecipeId(navigation.getParam("recipeId", null));
    setTitle(navigation.getParam("title", ""));
    setContent(navigation.getParam("content", ""));
    setTags(navigation.getParam("tags", []));
    setImages(navigation.getParam("images", []));
  }, []);

  useEffect(() => {
    setContent(navigation.getParam("content", ""));
  }, [navigation.state.params.content]);

  useEffect(() => {
    setTags(navigation.getParam("tags", []));
  }, [navigation.state.params.tags]);

  useEffect(() => {
    setImages(navigation.getParam("images", []));
  }, [navigation.state.params.images]);

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
    //GET TOKEN
    let token = await AsyncStorage.getItem("token");

    const data = new FormData();
    data.append("id", recipeId);

    if (!recipeId) {
      const imgs = images.map((i) => {
        return conventImageObject(i);
      });
      imgs.map((img) => {
        data.append("images", img);
      });
    }

    data.append("title", title);
    data.append("content", content);
    data.append("tags", JSON.stringify(tags));

    if (token !== null) {
      await axios
        .post(c.ADD_RECIPES, data, {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setSnackbar({
              visible: true,
              type: "info",
              message: "Recipe is added",
            });
            navigation.navigate("ListRecipe");
          } else if (response.status === 401 || response.status === 403) {
            setSnackbar({
              visible: true,
              type: "error",
              message: "Token expired, please try login again",
            });
          } else {
            setSnackbar({
              visible: true,
              type: "error",
              message: "Server error",
            });
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
          setSnackbar({
            visible: true,
            type: "error",
            message: "Cannot connect to server",
          });
        });
    } else {
      setSnackbar({
        visible: true,
        type: "error",
        message: "Cannot connect to server",
      });
    }
  }

  return (
    <>
      <Header titleText="Edit recipe" />
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Title"
              value={title}
              mode="outlined"
              onChangeText={setTitle}
              style={styles.text}
            />
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          {content !== "" && (
            <Card.Content>
              <TextInput
                label="Desciption"
                value={content}
                mode="outlined"
                multiline
                style={styles.text}
                disabled
              />
            </Card.Content>
          )}
          <Card.Actions style={styles.centerContainer}>
            <Button
              icon="pencil"
              mode="contained"
              onPress={() =>
                navigation.navigate("AddRecipeDescription", {
                  update: true,
                  content: content,
                })
              }
            >
              {content !== "" ? "Edit" : "Add"} description
            </Button>
          </Card.Actions>
        </Card>

        {images && (
          <View style={{ marginBotton: 10 }}>
            <SliderBox images={images} />
          </View>
        )}

        <Card style={styles.card}>
          <Card.Actions style={styles.centerContainer}>
            <Button
              icon="camera"
              mode="contained"
              onPress={() =>
                navigation.navigate("AddRecipeImages", {
                  update: true,
                  images: images,
                })
              }
            >
              {images ? "Edit" : "Add"} images
            </Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          {tags && (
            <Card.Content>
              <View style={styles.chipContainer}>
                {tags.map((tag, index) => {
                  return (
                    <Chip key={index} style={styles.chip}>
                      {tag}
                    </Chip>
                  );
                })}
              </View>
            </Card.Content>
          )}

          <Card.Actions style={styles.centerContainer}>
            <Button
              icon="tag"
              mode="contained"
              onPress={() =>
                navigation.navigate("AddRecipeTags", {
                  update: true,
                  tags: tags,
                })
              }
            >
              {tags ? "Edit" : "Add"} tags
            </Button>
          </Card.Actions>
        </Card>

        <View style={styles.card}>
          <Button
            style={styles.submitButton}
            mode="contained"
            icon="check"
            disabled={title == "" ? true : false}
            onPress={() => onSave()}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
      <SnackBar
        visible={snackbar.visible}
        type={snackbar.type}
        message={snackbar.message}
        onClose={hideSnackbar}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 120,
  },
  card: {
    flex: 1,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  centerContainer: {
    justifyContent: "center",
  },
  iconButton: {
    backgroundColor: "rgba(46, 113, 102, 0.8)",
    position: "absolute",
    right: 0,
    top: 5,
    margin: 10,
  },
  text: {
    fontSize: 16,
    // marginBottom: 20,
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 25,
  },
  chipContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  chip: {
    width: "auto",
    margin: 5,
  },
});