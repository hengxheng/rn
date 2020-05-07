import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Card, Button, Chip } from "react-native-paper";
import Header from "../../components/Header";
import { AsyncStorage } from "react-native";
import axios from "axios";
import * as c from "../../constants";
import { MessageText, ErrorText } from "../../components/Shared";
import { SliderBox } from "react-native-image-slider-box";

function AddRecipe({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const description = navigation.getParam("description", "");
    setContent(description);

    const _tags = navigation.getParam("tags", []);
    if (_tags) {
      setTags(_tags);
    }

    const _images = navigation.getParam("images", []);
    if (_images) {
      setImages(_images);
    }
  }, [navigation.state.params]);

  function conventImageObject(img) {
    let localUri =
      Platform.OS === "android" ? img.uri : img.uri.replace("file://", "");
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    return { uri: localUri, name: filename, type: type };
  }

  async function onSave() {
    try {
      //GET TOKEN
      let token = await AsyncStorage.getItem("token");

      const imgs = images.map((i) => {
        return conventImageObject(i);
      });

      const data = new FormData();
      imgs.map((img) => {
        data.append("images", img);
      });

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
              navigation.goBack();
            } else {
              setMessage("Error");
            }
          })
          .catch((error) => {
            setMessage("Error");
          });
      } else {
        setMessage("Unauthorised");
      }
    } catch (error) {
      setMessage(error);
    }
  }

  return (
    <>
      <Header titleText="Add recipe" />
      <ScrollView style={styles.container}>
        {error !== "" && <ErrorText error={error} />}
        {message !== "" && <MessageText message={message} />}
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
                  description: content,
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
                navigation.navigate("AddRecipeImages", { images: images })
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
                navigation.navigate("AddRecipeTags", { tags: tags })
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

export default AddRecipe;
