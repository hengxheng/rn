import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  Card,
  IconButton,
  Text,
  Title,
  Button,
  Avatar,
  List,
  Divider,
  Paragraph,
} from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../theme";
import { getComments } from "../services/app";
import { RECIPE_IMAGE_URL, USER_PROFILE_IMAGE_URL } from "../constants";
import { useAuth } from "../providers/auth";

export default function CommentSection(props) {
  const navigation = props.navigation;
  const recipeId = props.recipeId;
  const route = props.route;

  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const { state } = useAuth();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    _getComments(recipeId);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      if (mounted) {
        _getComments(recipeId);
      }

      return () => (mounted = false);
    }, [])
  );

  useEffect(() => {
    if (route.params?.commmentRefresh) {
      setRefresh(route.params.commmentRefresh);
    }
  }, [route.params?.commmentRefresh]);

  useEffect(() => {
    _getComments(recipeId);
  }, [refresh]);

  async function _getComments(recipeId) {
    try {
      const response = await getComments(recipeId);
      if (response.status === 200) {
        setComments(response.data.data);
      } else {
        if (typeof response.data.data === "string") {
          message = response.data.data;
        }
        // await handleLogout();
        // navigation.navigate("Auth");
      }
    } catch (err) {
      console.log("err");
      console.log(err.response);
    }
  }

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
                    if (state.user.id === c.User.id) {
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

        <View style={{ ...MainStyle.inputCard, marginTop: 30 }}>
          <Button
            style={MainStyle.innerButton2}
            mode="contained"
            icon="plus"
            onPress={() => gotoAddComment()}
          >
            Make a comment
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}
