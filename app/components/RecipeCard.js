import * as React from "react";
import { View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph, IconButton, Chip} from "react-native-paper";
import { RECIPE_IMAGE_URL, USER_PROFILE_IMAGE_URL } from "../constants";
import { Colors, chipContainer, tagStyle } from "../theme";

export default function RecipeCard(props) {
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
    <Card>
      <Card.Cover source={cover} />
      <Card.Title
        title={item.title}
        subtitle={item.User.firstName+" "+item.id} 
        left={LeftContent}
      />
      <Card.Content>
      <View style={ chipContainer }>
          {item.Tags.map((tag, index) => {
            return (
              <Chip
                key={index}
                style={tagStyle}
                icon="tag"
              >
                {tag.name}
              </Chip>
            );
          })}
        </View>
        {/* <Title></Title>
        <Paragraph>{item.content}</Paragraph> */}
      </Card.Content>
      <Card.Actions>
      <IconButton
            icon="eye-circle"
            color={Colors.primaryIconButton}
            size={30}
            onPress={() => console.log("Pressed")}
          />
      </Card.Actions>
    </Card>
  );
}
