import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

const Header = ({ scene, previous, navigation }) => {
  const theme = useTheme();
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: "#03b1fc" } }}>
      {previous && (
        <Appbar.BackAction
          onPress={ () => navigation.pop() }
          color={theme.colors.primary}
        />
      )}
      <Appbar.Content
        style={ styles.title }
        title={
          previous ? title : "Logo"
        }
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Header;
