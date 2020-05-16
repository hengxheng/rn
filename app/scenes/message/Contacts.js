import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button, FAB } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";

export default function AddDescription({ navigation, route }) {
  const [content, setContent] = useState("");
  const [returnURL, setReturnURL] = useState("AddRecipe");

  useEffect(() => {
    if (route.params?.content) {
      setContent(route.params.content);
    }

    if (route.params?.update === true){
      setReturnURL("UpdateRecipe");
    }
  }, [route.params]);

  return (
    <>
      <ScrollView style={MainStyle.sceneContainer}>
        <View style={MainStyle.inputCard}>
          <TextInput
            label="Desciption"
            value={content}
            onChangeText={setContent}
            mode="flat"
            multiline
            style={MainStyle.textInput}
          />
        </View>
      </ScrollView>
      <FAB
          style={MainStyle.fab}
          small
          icon="check"
          color="#fff"
          onPress={() =>
            navigation.navigate(returnURL, { content: content, contentChanged: true})
          }
        />
    </>
  );
}
