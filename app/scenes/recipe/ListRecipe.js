import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, FAB, List } from "react-native-paper";
import Header from "../../components/Header";
import { AsyncStorage } from "react-native";
import axios from "axios";
import * as c from "../../constants";
import RecipeCard from "./components/RecipeCard";

function ListRecipe({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getRecipes() {
      try {
        let token = await AsyncStorage.getItem("token");
        await axios
          .get(c.GET_RECIPES, {
            headers: { Authorization: `JWT ${token}` },
          })
          .then((response) => {
            // console.log(response);
            setRecipes(response.data.data);
          });
      } catch (error) {
        setMessage("Error");
      }
    }
    getRecipes();
  }, []);

  // const addRecipe = (recipe) => {
  //   recipe.id = recipes.length + 1;
  //   setRecipes([...recipes, recipe]);
  // };

  return (
    <>
      <Header titleText="Recipe" />
      <View style={styles.container}>
        {recipes.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>You do not have any recipe</Text>
          </View>
        ) : (
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <RecipeCard item={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="Add new recipe"
          onPress={() => navigation.navigate("AddRecipe")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 10,
  },
});

export default ListRecipe;
