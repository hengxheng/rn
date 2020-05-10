import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function Loading(props) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#00ff00" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
