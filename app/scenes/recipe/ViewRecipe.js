import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  TextInput,
  Card,
  Button,
  Chip,
  Paragraph,
  Title,
} from "react-native-paper";
import { AsyncStorage } from "react-native";
import axios from "axios";
import * as c from "../../constants";
import { SliderBox } from "react-native-image-slider-box";
import SnackBar from "../../components/SnackBar";
import { RECIPE_IMAGE_URL } from "../../constants";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";

export default function ViewRecipe({ navigation, route }) {
  const recipeId = route.params.id;

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
    onLoad();
  }, []);

  function hideSnackbar() {
    setSnackbar({ ...snackbar, visible: false });
  }

  function pluckTagName(tagObjs) {
    if (!tagObjs) {
      return null;
    }

    let tagNames = [];
    tagNames = tagObjs.map((tag) => {
      return tag.name;
    });

    return tagNames;
  }

  function pluckImages(imageObjs) {
    if (!imageObjs) {
      return null;
    }

    let images = [];
    images = imageObjs.map((img) => {
      const path = img.path;
      return { uri: `${RECIPE_IMAGE_URL}/${path}`, uploaded: true };
    });

    return images;
  }

  async function onLoad() {
    //GET TOKEN
    let token = await AsyncStorage.getItem("token");
    if (token !== null && recipeId !== null) {
      await axios
        .get(`${c.VIEW_RECIPE}/${recipeId}`, {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          // console.log(response.data);
          if (response.status === 200) {
            const recipe = response.data.data;
            setTitle(recipe.title);
            setContent(recipe.content);
            setImages(pluckImages(recipe.RecipeImages));
            setTags(pluckTagName(recipe.Tags));
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
      <ScrollView style={MainStyle.sceneContainer}>
        {images && (
          <View style={{ marginBotton: 10 }}>
            <SliderBox images={images} />
          </View>
        )}
        <Card style={styles.card}>
          <Card.Content>
            <Title>{title}</Title>
            {content !== "" && <Paragraph>{content}</Paragraph>}
          </Card.Content>
          {tags && (
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
        </Card>

        {/* 
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
        </View> */}
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
});
