import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button, FAB } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { addComment, removeComment } from "../../services/app";

export default function AddComment({ navigation, route }) {
  const [commentId, setCommentId] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (route.params?.comment) {
        setComment(route.params.comment);
      }

      if (route.params?.commentId) {
        setCommentId(route.params.commentId);
      }

      if (route.params?.recipeId) {
        setRecipeId(route.params.recipeId);
      }
    }
    return () => (mounted = false);
  }, [route.params]);

  async function onSave(commentId, recipeId, comment) {
    const response = await addComment(commentId, recipeId, comment);
    if (response.error) {
      setSnackbar({
        visible: true,
        type: "error",
        message: response.message,
      });
    } else {
      navigation.navigate("ViewHomeRecipe");
    }
  }

  async function onDelete(commentId, recipeId) {
    const response = await removeComment(commentId, recipeId);
    
    if (response.error) {
      setSnackbar({
        visible: true,
        type: "error",
        message: response.message,
      });
    } else {
      navigation.navigate("ViewHomeRecipe");
    }
  }

  return (
    <>
      <ScrollView style={MainStyle.sceneContainer}>
        <View style={MainStyle.inputCard}>
          <TextInput
            label="Comment"
            value={comment}
            onChangeText={setComment}
            mode="flat"
            multiline
            style={MainStyle.textInput}
          />
        </View>
      </ScrollView>
      <FAB
        style={{ ...MainStyle.fab, bottom: 50 }}
        small
        icon="check"
        color="#fff"
        onPress={() => onSave(commentId, recipeId, comment)}
      />

      <FAB
        style={{ ...MainStyle.fab, backgroundColor: Colors.yellow }}
        small
        icon="delete"
        color="#fff"
        onPress={() => onDelete(commentId, recipeId)}
      />
    </>
  );
}
