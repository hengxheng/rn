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
    flex:1,
    fontFamily: (Platform.OS === "ios" ? "HelveticaNeue" : "Roboto"),
    backgroundColor: "#ebebeb",
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  bottomTabBar: {
    backgroundColor: "#fff",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 20,
  },
  cartContentContainer: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
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


