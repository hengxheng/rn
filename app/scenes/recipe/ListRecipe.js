import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  AppState,
} from "react-native";
import { Text, FAB } from "react-native-paper";
import Header from "../../components/Header";
import { AsyncStorage } from "react-native";
import axios from "axios";
import * as c from "../../constants";
import { useAuth } from "../../providers/auth";
import MyRecipeCard from "../../components/MyRecipeCard";
import SnackBar from "../../components/SnackBar";

function ListRecipe({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });
  const { state } = useAuth();

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    setRecipes([]);
    setPage(0);
    getRecipes(page);

    AppState.addEventListener("change", _handleAppStateChange);
    // console.log(state.user);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };

  }, []);

  const _handleAppStateChange = nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      console.log("App has come to the foreground!");
    }
    setAppState(nextAppState);
  };

  function hideSnackbar(){
    setSnackbar({ ...snackbar, visible: false} );
  }

  async function getRecipes(fetchPage) {
    let token = await AsyncStorage.getItem("token");
    await axios
      .get(`${c.GET_USER_RECIPES}/${state.user.id}/${fetchPage}`, {
        headers: { Authorization: `JWT ${token}` },
      })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
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
        } else if (response.status === 401 || response.status === 403) {
          setSnackbar({
            visible: true,
            type: "error",
            message: "Token expired, please try login again",
          });
        } else {
          setSnackbar({
            visible: true,
            type: "error",
            message: "Server error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setSnackbar({
          visible: true,
          type: "error",
          message: "Cannot connect to server",
        });
      });

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
            renderItem={({ item }) => <MyRecipeCard item={item} navigation={navigation}/>}
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
      <SnackBar
          visible={snackbar.visible}
          type={snackbar.type}
          message={snackbar.message}
          onClose={hideSnackbar}
        />
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
    width: "100%",
    height: 200,
    paddingVertical: 20,
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
