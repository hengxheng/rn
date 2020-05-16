import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Card,
  IconButton,
  Avatar,
  Divider,
  Paragraph,
} from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../theme";
import { getComments } from "../services/app";
import SnackBar from "./SnackBar";
import { RECIPE_IMAGE_URL, USER_PROFILE_IMAGE_URL } from "../constants";
import { useAuth } from "../providers/auth";

export default function CommentSection(props) {
  const navigation = props.navigation;
  const recipeId = props.recipeId;
  const route = props.route;

  const [comments, setComments] = useState([]);
  const { state } = useAuth();

  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });

  function hideSnackbar() {
    setSnackbar({ ...snackbar, visible: false });
  }

  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;

      getComments(recipeId).then((response) => {
        if (mounted) {
          if (response.error) {
            setSnackbar({
              visible: true,
              type: "error",
              message: response.message,
            });
          } else {
            setComments(response.data);
          }
        }
      });

      return () => (mounted = false);
    }, [])
  );

  function gotoAddComment() {
    // setRefresh(false);
    navigation.navigate("AddComment", { recipeId: recipeId });
  }

  function editComment(recipeId, commentId, comment) {
    navigation.navigate("AddComment", { recipeId, commentId, comment });
  }

  return (
    <Card style={MainStyle.cardContainer}>
      <Card.Title
        title="Comments"
        left={() => <Avatar.Icon icon="comment" size={40} />}
        right={() => (
          <IconButton
            icon="plus"
            onPress={() => gotoAddComment()}
            style={MainStyle.primaryBtn}
            color="#fff"
            size={20}
          />
        )}
      />
      <Card.Content>
        {comments.length > 0 &&
          comments.map((c, index) => {
            return (
              <Card key={index}>
                <Card.Title
                  title={c.User.nickname}
                  left={() => (
                    <Avatar.Image
                      size={36}
                      source={{
                        uri: `${USER_PROFILE_IMAGE_URL}/${c.User.image}`,
                      }}
                    />
                  )}
                  right={() => {
                    if (state.user?.id && state.user.id === c.User.id) {
                      return (
                        <IconButton
                          icon="square-edit-outline"
                          color={Colors.red}
                          size={20}
                          onPress={() => editComment(recipeId, c.id, c.content)}
                        />
                      );
                    }
                  }}
                />
                <Card.Content>
                  <Paragraph>{c.content}</Paragraph>
                </Card.Content>
                <Divider />
              </Card>
            );
          })}
        <SnackBar
          visible={snackbar.visible}
          type={snackbar.type}
          message={snackbar.message}
          onClose={hideSnackbar}
        />
      </Card.Content>
    </Card>
  );
}
