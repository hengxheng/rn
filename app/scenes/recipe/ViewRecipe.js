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
import { SliderBox } from "react-native-image-slider-box";
import SnackBar from "../../components/SnackBar";
import { RECIPE_IMAGE_URL } from "../../constants";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { viewRecipe } from "../../services/app";
import { useAuth } from "../../providers/auth";
import RateCard from "../../components/RateCard";

export default function ViewRecipe({ navigation, route }) {
  const recipeId = route.params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState({ like: 0, dislike: 0});

  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });
  const { handleLogout } = useAuth();

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
    
    if (recipeId !== null) {
      try {
        
        const response = await viewRecipe(recipeId);

        if (response.status === 200) {
          const recipe = response.data.recipe;
          setTitle(recipe.title);
          setContent(recipe.content);
          setImages(pluckImages(recipe.RecipeImages));
          setTags(pluckTagName(recipe.Tags));
          
          const r = response.data.rating;
          if(r){
            setRating({
              like: r.like,
              dislike: r.dislike,
            });
          }
        } else {
          if (typeof response.data.data === "string") {
            message = response.data.data;
          }
          setSnackbar({
            visible: true,
            type: "error",
            message: message,
          });

          await handleLogout();
          navigation.navigate("Auth");
        }
      } catch (e) {
        setSnackbar({
          visible: true,
          type: "error",
          message: e.message,
        });
        await handleLogout();
        navigation.navigate("Auth");
      }
    }
  }

  return (
    <>
      <ScrollView style={{ ...MainStyle.sceneContainer, paddingHorizontal: 0 }}>
        {images && (
          <View>
            <SliderBox images={images} />
          </View>
        )}
        <Card style={MainStyle.contentCard}>
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
            
        <RateCard navigation={ navigation } recipeId = {recipeId } likeCount={rating.like} dislikeCount={rating.dislike} />
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
