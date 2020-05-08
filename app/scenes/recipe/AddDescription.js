import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Header from "../../components/Header";

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
      <Header titleText="Add recipe" />
      <ScrollView style={styles.container}>
        <TextInput
          label="Desciption"
          value={content}
          onChangeText={setContent}
          mode="outlined"
          multiline
          style={styles.text}
        />
        <View>
          <Button
            style={styles.submitButton}
            mode="contained"
            icon="check"
            onPress={() =>
              navigation.navigate(returnURL, { content: content })
            }
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 120,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 25,
  },
});

AddDescription.navigationOptions = ({}) => {
  return {
    title: `Recipe description`,
  };
};
