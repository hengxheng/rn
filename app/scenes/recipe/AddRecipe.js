import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Text,
  IconButton,
  TextInput,
  FAB,
  Card,
  Button,
  Paragraph,
} from "react-native-paper";
import Header from "../../components/Header";
import { AsyncStorage } from "react-native";
import axios from "axios";
import * as c from "../../constants";
import { MessageText, ErrorText } from "../../components/Shared";

function AddRecipe({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    const description = navigation.getParam("description", null); 
    setContent(description);
  }, [navigation.state.params]);
  async function onSaveRecipe() {
    try {
      //GET TOKEN
      let token = await AsyncStorage.getItem("token");

      if (token !== null) {
        await axios
          .post(
            c.ADD_RECIPES,
            {
              title,
              content,
            },
            {
              headers: {
                Authorization: `JWT ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              navigation.goBack();
            } else {
              setMessage("Error");
            }
          })
          .catch((error) => {
            setMessage("Error");
          });
      } else {
        setMessage("Unauthorised");
      }
    } catch (error) {
      setMessage(error);
    }
  }

  return (
    <>
      <Header titleText="Add recipe" />
      <ScrollView style={styles.container}>
        {error !== "" && <ErrorText error={error} />}
        {message !== "" && <MessageText message={message} />}
        <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Title"
            value={title}
            mode="outlined"
            onChangeText={setTitle}
            style={styles.text}
          />
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          {content !== "" && (
            <Card.Content>
              <TextInput
                label="Desciption"
                value={content}
                mode="outlined"
                multiline
                style={styles.text}
                disabled
              />
            </Card.Content>
          )}
          <Card.Actions style={styles.centerContainer}>
            <Button
              icon="pencil"
              mode="contained"
              onPress={() => navigation.navigate("AddRecipeDescription", { description: content })}
            >
              {(content !== "")?"Edit":"Add"} description
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Actions style={styles.centerContainer}>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => navigation.navigate("AddRecipeImages", { description: content })}
            >
              Add images
            </Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Actions style={styles.centerContainer}>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => navigation.navigate("AddRecipeTags", { description: content })}
            >
              Add tags
            </Button>
          </Card.Actions>
        </Card>

        <View style={styles.card}>
          <Button
            style={styles.submitButton}
            mode="contained"
            icon="check"
            disabled={title == "" ? true : false}
            onPress={() => onSaveRecipe()}
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
  card: {
    flex: 1,
    marginBottom: 15,
  },
  centerContainer: {
    justifyContent: "center",
  },
  iconButton: {
    backgroundColor: "rgba(46, 113, 102, 0.8)",
    position: "absolute",
    right: 0,
    top: 5,
    margin: 10,
  },
  text: {
    fontSize: 16,
    // marginBottom: 20,
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 25,
  },
});

export default AddRecipe;
