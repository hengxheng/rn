import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button, Chip } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";

export default function AddTags({ navigation, route }) {

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [returnURL, setReturnURL] = useState("AddRecipe");

  useEffect(() => {
    if (route.params?.tags) {
      setTags(route.params.tags);
    }

    if (route.params?.update === true){
      setReturnURL("UpdateRecipe");
    }
  }, [route.params]);

  function addTag() {
    if (tag !== "") {
      setTags([...tags, tag]);
      setTag("");
    }
  }

  function removeTag(index) {
      let _tags = [ ...tags ]; // make a separate copy of the array
      _tags.splice(index, 1);
      setTags(_tags);
  }

  return (
    <>
      <ScrollView style={MainStyle.sceneContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Tags"
            value={tag}
            onChangeText={setTag}
            mode="outlined"
            style={styles.text}
          />
          <Button
            style={styles.submitButton}
            mode="contained"
            icon="check-circle"
            onPress={() => addTag()}
          >
            Add
          </Button>
        </View>
        <View style={styles.chipContainer}>
          {tags.map((tag, index) => {
            return (
              <Chip
                key={index}
                style={styles.chip}
                onClose={() => removeTag(index) }
              >
                {tag}
              </Chip>
            );
          })}
        </View>
        <View>
          <Button
            style={styles.submitButton}
            mode="contained"
            icon="check"
            onPress={() =>
              navigation.navigate(returnURL, { tags: tags, tagChanged: true })
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
  chipContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 25,
  },
  chip: {
    width: "auto",
    margin: 5,
  },
});

AddTags.navigationOptions = ({}) => {
  return {
    title: `Recipe tags`,
  };
};
