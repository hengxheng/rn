import { Platform, StyleSheet } from "react-native";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

export const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};

export const CombinedDarkTheme = { 
  ...PaperDarkTheme, 
  ...NavigationDarkTheme 
};

export const Colors = {
  primaryIconButton: "#03DAC6",
};

export const MainStyle = StyleSheet.create({
  sceneContainer: { 
    fontFamily: (Platform.OS === "ios" ? "HelveticaNeue" : "Roboto"),
    backgroundColor: "#f1f1f1",
    fontSize: 14,
  },
  tagContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  tagBox: {
    width: "auto",
    margin: 5,
  }
});


