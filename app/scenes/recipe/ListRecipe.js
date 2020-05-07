import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Text, FAB, List } from "react-native-paper";
import Header from "../../components/Header";
import { AsyncStorage } from "react-native";
import axios from "axios";
import * as c from "../../constants";
import RecipeCard from "./components/RecipeCard";

function ListRecipe({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRecipes([]);
    setPage(0);
    getRecipes(page);
  }, []);

  // useEffect(() => {}, [loadingMore]);

  async function getRecipes(fetchPage) {
    try {
      let token = await AsyncStorage.getItem("token");
      await axios
        .get(`${c.GET_RECIPES}/${fetchPage}`, {
          headers: { Authorization: `JWT ${token}` },
        })
        .then((response) => {
          // console.log(response.data.data);
          const recipeData = response.data.data;
          if (recipeData.length > 0) {
            if (fetchPage === 0) {
              setRecipes(recipeData);
            } else {
              setRecipes([...recipes, ...recipeData]);
            }
            const currentPage = response.data.currentPage;
            setPage(currentPage);
            setLoadingMore(true);
          } else {
            setLoadingMore(false);
          }
          
        });
    } catch (error) {
      setMessage("Error");
    }
    setRefreshing(false);
  }

  function handleLoadMore() {
    if (loadingMore) {
      getRecipes(page + 1);
    }
  }

  function handleRefresh() {
    setPage(0);
    setRefreshing(true);
    setLoadingMore(true);
    getRecipes(0);
  }

  function _renderFooter() {
    if (!loadingMore) return null;

    return (
      <View style={styles.listFooter}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <>
      <Header titleText="Recipe" />
      <SafeAreaView style={styles.container}>
        {recipes.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>You do not have any recipe</Text>
          </View>
        ) : (
          <FlatList
            data={recipes}
            renderItem={({ item }) => <RecipeCard item={item} />}
            initialNumToRender={8}
            onEndReached={() => handleLoadMore()}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={() => handleRefresh()}
            refreshing={refreshing}
            ListFooterComponent={_renderFooter}
          />
        )}
      </SafeAreaView>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="ADD"
        onPress={() => navigation.navigate("AddRecipe")}
      />
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
  listFooter: {
    position: "relative",
    width: "100%",
    height: 200,
    paddingVertical: 20,
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "grey",
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    top: 5,
  },
});

export default ListRecipe;
