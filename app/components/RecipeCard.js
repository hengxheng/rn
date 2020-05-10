import * as React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  IconButton,
  Chip,
} from "react-native-paper";
import { RECIPE_IMAGE_URL, USER_PROFILE_IMAGE_URL } from "../constants";
import { CombinedDefaultTheme, MainStyle, Colors } from "../theme";

export default function RecipeCard(props) {
  const navigation = props.navigation;
  const item = props.item;

  let LeftContent = () => <Avatar.Icon size={36} icon="face" />;
  if (item.User.image) {
    LeftContent = () => (
      <Avatar.Image
        size={36}
        source={{ uri: `${USER_PROFILE_IMAGE_URL}/${item.User.image}` }}
      />
    );
  }

  const cover =
    item.RecipeImages.length > 0
      ? { uri: RECIPE_IMAGE_URL + "/" + item.RecipeImages[0].path }
      : require("../../assets/image-placeholder.png");

  return (
    <Card style={MainStyle.cardContainer}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="transparent"
        onPress={() =>
          navigation.push("ViewHomeRecipe", {
            id: item.id,
          })
        }
      >
        <>
          <Card.Cover source={cover} />
          <Card.Title
            title={item.title}
            subtitle={item.User.firstName + " " + item.id}
            left={LeftContent}
          />
        </>
      </TouchableHighlight>
      <Card.Content style={MainStyle.cartContentContainer}>
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
        {/* <IconButton
          icon="eye-circle"
          color={Colors.primaryIconButton}
          size={30}
          onPress={() =>
            navigation.push("ViewHomeRecipe", {
              id: item.id,
            })
          }
        /> */}
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
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
  cartContentContainer: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  chipContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "flex-start",
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
