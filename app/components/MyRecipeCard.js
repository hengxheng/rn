import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Chip,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { RECIPE_IMAGE_URL } from "../constants";
import { CombinedDefaultTheme, MainStyle, Colors } from "../theme";

export default function MyRecipeCard(props) {
  const navigation = props.navigation;
  const item = props.item;
  const cover =
    item.RecipeImages.length > 0
      ? { uri: RECIPE_IMAGE_URL + "/" + item.RecipeImages[0].path }
      : require("../../assets/image-placeholder.png");

  // console.log(item.content);
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

  return (
    <Card style={styles.cardContainer}>
      <Card.Cover source={cover} />
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.createdAt}</Paragraph>
        <View style={MainStyle.tagContainer}>
          {item.Tags.map((tag, index) => {
            return (
              <Chip key={index} style={MainStyle.tagBox} icon="tag">
                {tag.name}
              </Chip>
            );
          })}
        </View>
      </Card.Content>
      <Card.Actions>
        <View style={styles.listButtonContainer}>
          <IconButton
            icon="eye-circle"
            color={Colors.primaryIconButton}
            size={30}
            onPress={() =>
              navigation.navigate("ViewRecipe", {
                id: item.id,
              })
            }
          />
          <IconButton
            icon="content-save-edit-outline"
            color={Colors.primaryIconButton}
            size={30}
            onPress={() =>
              navigation.navigate("UpdateRecipe", {
                screen: "UpdateRecipe",
                params: {
                  id: item.id,
                  title: item.title,
                  content: item.content,
                  images: pluckImages(item.RecipeImages),
                  tags: pluckTagName(item.Tags),
                },
              })
            }
          />
        </View>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  listButtonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
  listFooter: {
    width: "100%",
    height: 200,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "grey",
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    top: 5,
  },
});
