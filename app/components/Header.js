import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../theme";

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
    <Appbar.Header style={MainStyle.headerBar}>
      {previous && (
        <Appbar.BackAction
          onPress={() => navigation.pop()}
          size={20}
          style={MainStyle.secondaryBtn}
          color={Colors.secondaryBtnColor}
        />
      )}
      <Appbar.Content
        title="Recipe"
        titleStyle={MainStyle.headerBarTitle}
        subtitle={previous ? title : scene.route.name}
        subtitleStyle={MainStyle.headerBarSubtitle}
      />
      {options.headerRight && (
        <Appbar.Action
          icon={options.headerRightIcon ? options.headerRightIcon : "search"}
          style={MainStyle.primaryBtn}
          size={20}
          color={Colors.primaryBtnColor}
          onPress={() => options.headerRight()}
        />
      )}
    </Appbar.Header>
  );
};

export default Header;
