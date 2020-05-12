import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  AppState,
} from "react-native";
import { Text, FAB, IconButton } from "react-native-paper";
import { useAuth } from "../../providers/auth";
import MyRecipeCard from "../../components/MyRecipeCard";
import RecipeOptionsModal from "../../components/RecipeOptionsModal";
import SnackBar from "../../components/SnackBar";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { getUserRecipes } from "../../services/app";

export default function ListRecipe({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });
  const { state,handleLogout } = useAuth();

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      handleRefresh();
    }

    AppState.addEventListener("change", _handleAppStateChange);
    // console.log(state.user);
    return () => {
      mounted = false;
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      console.log("App has come to the foreground!");
    }
    setAppState(nextAppState);
  };

  function hideSnackbar() {
    setSnackbar({ ...snackbar, visible: false });
  }

  async function _getUserRecipes(userId, fetchPage) {
    try {
      const response = await getUserRecipes(userId, fetchPage);
      let message = "Server error";
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
      } else {
        if (typeof response.data.data === "string") {
          message = response.data.data;
        }
        setSnackbar({
          visible: true,
          type: "error",
          message: message,
        });

        await handleLogout();
        navigation.navigate("Auth");
      }
    } catch (e) {
      setSnackbar({
        visible: true,
        type: "error",
        message: e.message,
      });
      await handleLogout();
      navigation.navigate("Auth");
    }
    setRefreshing(false);
  }

  async function handleLoadMore() {
    if (loadingMore) {
      await _getUserRecipes(state.user.id, page + 1);
    }
  }

  async function handleRefresh() {
    setPage(0);
    setRefreshing(true);
    setLoadingMore(true);
    await _getUserRecipes(state.user.id, 0);
  }

  function _renderFooter() {
    if (!loadingMore) return null;

    return (
      <View style={styles.listFooter}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  function closeOptionModal() {
    setOptionModalVisible(false);
    setSelectedItem(null);
  }

  function openOptionModal(item) {
    setOptionModalVisible(true);
    setSelectedItem(item);
  }

  function add() {
    navigation.navigate("AddRecipe");
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRightIcon: "plus",
      headerRight: add,
    });
  }, [navigation, add]);

  return (
    <>
      <SafeAreaView style={MainStyle.sceneContainer}>
        {recipes.length === 0 ? (
          <View style={MainStyle.centerContainer}>
            <Text style={styles.title}>You do not have any recipe</Text>
            <IconButton
              icon="refresh"
              size={20}
              onPress={() => handleRefresh()}
            />
          </View>
        ) : (
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <MyRecipeCard
                item={item}
                navigation={navigation}
                onClick={openOptionModal}
              />
            )}
            initialNumToRender={8}
            onEndReached={() => handleLoadMore()}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={() => handleRefresh()}
            refreshing={refreshing}
            ListFooterComponent={_renderFooter}
          />
        )}

        <RecipeOptionsModal
          visible={optionModalVisible}
          item={selectedItem}
          onClose={closeOptionModal}
          navigation={navigation}
        />
      </SafeAreaView>
      <SnackBar
        visible={snackbar.visible}
        type={snackbar.type}
        message={snackbar.message}
        onClose={hideSnackbar}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
});
