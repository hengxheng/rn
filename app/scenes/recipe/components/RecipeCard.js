import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { RECIPE_IMAGE_URL, USER_PROFILE_IMAGE_URL } from "../../../constants";

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
      : require("../../../../assets/image-placeholder.png");
  //   console.log(item);
  return (
    <Card>
      <Card.Title
        title={item.User.firstName+" "+item.id} 
        subtitle={item.title}
        left={LeftContent}
      />
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.content}</Paragraph>
      </Card.Content>
      <Card.Cover source={cover} />
      <Card.Actions>
        <Button>View</Button>
      </Card.Actions>
    </Card>
  );
}
