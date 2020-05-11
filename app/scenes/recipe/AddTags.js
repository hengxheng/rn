import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button, Chip, FAB } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";

export default function AddTags({ navigation, route }) {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [returnURL, setReturnURL] = useState("AddRecipe");

  useEffect(() => {
    if (route.params?.tags) {
      setTags(route.params.tags);
    }

    if (route.params?.update === true) {
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
    let _tags = [...tags]; // make a separate copy of the array
    _tags.splice(index, 1);
    setTags(_tags);
  }

  return (
    <>
      <ScrollView style={MainStyle.sceneContainer}>
        <View style={MainStyle.inputCard}>
          <TextInput
            label="Tags"
            value={tag}
            onChangeText={setTag}
            mode="flat"
            style={MainStyle.textInput}
          />
          <Button
            style={MainStyle.innerButton2}
            mode="contained"
            icon="check-circle"
            onPress={() => addTag()}
          >
            Add
          </Button>
        </View>
        <View style={{ ...MainStyle.tagContainer, margin: 10 }}>
          {tags.map((tag, index) => {
            return (
              <Chip
                key={index}
                style={MainStyle.tagBox}
                onClose={() => removeTag(index)}
              >
                {tag}
              </Chip>
            );
          })}
        </View>
      </ScrollView>
      <FAB
        style={MainStyle.fab}
        small
        icon="check"
        color="#fff"
        onPress={() =>
          navigation.navigate(returnURL, { tags: tags, tagChanged: true })
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});

AddTags.navigationOptions = ({}) => {
  return {
    title: `Recipe tags`,
  };
};
