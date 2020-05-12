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

  useEffect(()=> {
    setDislikeCount(props.dislikeCount);
    setLikeCount(props.likeCount);
  }, [props.likeCount, props.dislikeCount])

  async function getRateStatus() {
    try {
      const response = await getRate(recipeId);
      if (response.status === 200) {
        if (response.data.data == 1) {
          setLike(true);
        } else if (response.data.data == 2) {
          setDislike(true);
        }
      } else {
        if (typeof response.data.data === "string") {
          message = response.data.data;
        }
        await handleLogout();
        navigation.navigate("Auth");
      }
    } catch (err) {
      console.log(err.response);
    }
  }

  function clickLike(v) {
    setLike(!v);
    setDislike(false);

    if(!v){
        onSubmit(recipeId, 1); //1 = like
    }
    else{
        onSubmit(recipeId, 0); //0 = cancel like
    }
  }

  function clikcDislike(v) {
    setDislike(!v);
    setLike(false);

    if(!v){
        onSubmit(recipeId, 2); //1 = dislike
    }
    else{
        onSubmit(recipeId, 0); //0 = cancel dislike
    }
  }

  async function onSubmit(recipeId, rate) {
    try {
      const response = await addRate(recipeId, rate);

      if (response.status === 200) {
        setDislikeCount(response.data.data.dislike);
        setLikeCount(response.data.data.like);
      } else {
        if (typeof response.data.data === "string") {
          message = response.data.data;
        }
        await handleLogout();
        navigation.navigate("Auth");
      }
    } catch (err) {
      console.log(err.response);
      await handleLogout();
      navigation.navigate("Auth");
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
