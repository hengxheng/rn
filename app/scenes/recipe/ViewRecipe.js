import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  TextInput,
  Card,
  Button,
  Chip,
  Paragraph,
  Title,
  Avatar,
  IconButton,
} from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";
import SnackBar from "../../components/SnackBar";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { viewRecipe } from "../../services/app";
import { useAuth } from "../../providers/auth";
import RateCard from "../../components/RateCard";
import CommentSection from "../../components/CommentSection";
import { RECIPE_IMAGE_URL, USER_PROFILE_IMAGE_URL } from "../../constants";
import { State } from "react-native-gesture-handler";

export default function ViewRecipe({ navigation, route }) {
  const recipeId = route.params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [author, setAuthor] = useState(null);
  const [rating, setRating] = useState({ like: 0, dislike: 0 });

  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });
  const { state, handleLogout } = useAuth();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      onLoad();
    }
    return () => (mounted = false);
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
      const response = await viewRecipe(recipeId);
      if (response.error) {
        setSnackbar({
          visible: true,
          type: "error",
          message: response.message,
        });
        await handleLogout();
        navigation.navigate("Auth");
      } else {
        const recipe = response.data;
        setTitle(recipe.title);
        setContent(recipe.content);
        setImages(pluckImages(recipe.RecipeImages));
        setTags(pluckTagName(recipe.Tags));
        setAuthor(recipe.User);
        const r = response.rating;
        if (r) {
          setRating({
            like: r.like,
            dislike: r.dislike,
          });
        }
      }
    }
  }

  function LeftContent() {
    return author.image ? (
      <Avatar.Image
        size={36}
        source={{ uri: `${USER_PROFILE_IMAGE_URL}/${author.image}` }}
      />
    ) : (
      <Avatar.Icon size={36} icon="face" />
    );
  }

  function RightContent() {
    return (author && author.id != state.user.id) ? (
      <IconButton
        icon="message"
        style={MainStyle.secondaryBtn}
        color="#fff"
        size={20}
        onPress={() => navigation.navigate( "Message", {
          screen: "ViewMessage", 
          params: {receiver: author},
        } ) }
      />
    ):false;
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
          {author && (
            <Card.Title
              title={author.firstName + " " + author.lastName}
              left={() => LeftContent()}
              right={() => RightContent()}
            />
          )}

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

        <RateCard
          navigation={navigation}
          recipeId={recipeId}
          likeCount={rating.like}
          dislikeCount={rating.dislike}
        />
        <CommentSection
          navigation={navigation}
          route={route}
          recipeId={recipeId}
        />
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
