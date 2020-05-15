import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../theme";
import { addRate, getRate } from "../services/app";
import { useAuth } from "../providers/auth";

export default function RateCard(props) {
  const navigation = props.navigation;
  const recipeId = props.recipeId;
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likeCount);
  const [dislikeCount, setDislikeCount] = useState(props.dislikeCount);
  const { handleLogout } = useAuth();

  useEffect(() => {
    getRateStatus();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setDislikeCount(props.dislikeCount);
      setLikeCount(props.likeCount);
    }
    return () => (mounted = false);
  }, [props.likeCount, props.dislikeCount]);

  async function getRateStatus() {
    const response = await getRate(recipeId);
    if (response.error) {
      setSnackbar({
        visible: true,
        type: "error",
        message: response.message,
      });
    } else {
      if (response.data == 1) {
        setLike(true);
      } else if (response.data == 2) {
        setDislike(true);
      }
    }
  }

  function clickLike(v) {
    setLike(!v);
    setDislike(false);

    if (!v) {
      onSubmit(recipeId, 1); //1 = like
    } else {
      onSubmit(recipeId, 0); //0 = cancel like
    }
  }

  function clikcDislike(v) {
    setDislike(!v);
    setLike(false);

    if (!v) {
      onSubmit(recipeId, 2); //1 = dislike
    } else {
      onSubmit(recipeId, 0); //0 = cancel dislike
    }
  }

  async function onSubmit(recipeId, rate) {
      const response = await addRate(recipeId, rate);
      if (response.error) {
        setSnackbar({
          visible: true,
          type: "error",
          message: response.message,
        });
      } else {
        setDislikeCount(response.data.dislike);
        setLikeCount(response.data.like);
      } 
  }

  return (
    <Card style={MainStyle.cardContainer}>
      <Card.Actions>
        <IconButton
          icon={like ? "thumb-up" : "thumb-up-outline"}
          color={like ? Colors.red : "grey"}
          size={30}
          onPress={() => clickLike(like)}
        />
        <Text>{likeCount}</Text>

        <IconButton
          icon={dislike ? "thumb-down" : "thumb-down-outline"}
          color={dislike ? Colors.red : "grey"}
          size={30}
          onPress={() => clikcDislike(dislike)}
        />
        <Text>{dislikeCount}</Text>
      </Card.Actions>
    </Card>
  );
}
