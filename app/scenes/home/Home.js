import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Text, FAB, List, IconButton } from "react-native-paper";
import RecipeCard from "../../components/RecipeCard";
import SnackBar from "../../components/SnackBar";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { useAuth } from "../../providers/auth";
import { getRecipes } from "../../services/app";

export default function Home({ navigation }) {
  const { handleLogout } = useAuth();

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

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      handleRefresh();
    }
    return () => (mounted = false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      if (mounted) {
        handleRefresh();
      }

      return () => (mounted = false);
    }, [])
  );

  function hideSnackbar() {
    setSnackbar({ ...snackbar, visible: false });
  }

  async function _getRecipes(fetchPage) {
    const response = await getRecipes(fetchPage);

    if (response.error) {
      setSnackbar({
        visible: true,
        type: "error",
        message: response.message,
      });
      await handleLogout();
      navigation.navigate("Auth");
    } else {
      const recipeData = response.data;
      if (recipeData.length > 0) {
        if (fetchPage === 0) {
          setRecipes(recipeData);
        } else {
          setRecipes([...recipes, ...recipeData]);
        }
        const currentPage = response.currentPage;
        setPage(currentPage);
        setLoadingMore(true);
      } else {
        setLoadingMore(false);
      }
    }
    setRefreshing(false);
  }

  async function handleLoadMore() {
    if (loadingMore) {
      await _getRecipes(page + 1);
    }
  }

  async function handleRefresh() {
    setPage(0);
    setRefreshing(true);
    setLoadingMore(true);
    await _getRecipes(0);
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
              <RecipeCard item={item} navigation={navigation} />
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
