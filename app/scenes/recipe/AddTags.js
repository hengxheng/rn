import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Header from "../../components/Header";

export default function AddTags(props) {
  const navigation = props.navigation;
  const [content, setContent] = useState(props.description);

  useEffect(() => {
    const description = navigation.getParam("description", null);
    if (description) {
      setContent(description);
    }
  }, [navigation.state.params]);
  
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
              navigation.navigate("AddRecipe", { description: content })
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
