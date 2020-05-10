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
  primaryBtnColor: "#fff",
  secondaryBtnColor: "#fff",
};

export const MainStyle = StyleSheet.create({
  primaryBtn: {
    backgroundColor: "#f77862",
  },
  secondaryBtn: {
    backgroundColor: "#fcb661",
  },
  sceneContainer: { 
    flex:1,
    fontFamily: (Platform.OS === "ios" ? "HelveticaNeue" : "Roboto"),
    backgroundColor: "#5f7393",
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 20,
    color: "#fff",
  },
  headerBar: {
    paddingTop:15,
    backgroundColor: "#5f7393",
    borderWidth:0,
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  headerBarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  headerBarSubtitle:{
    fontSize: 12,
    marginVertical: 5,
    color: "#fff",
  },  
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  },
  formContainer: {
    flex: 1,
    paddingVertical: 20,
    alignItems:"center",
  },
  innerButton: {
    backgroundColor: "#41b2e2",
    width: "80%",
    color: "#fff",
  },
  textInput: {
    color: "#000",
    fontSize: 14,
    backgroundColor: "#fef4e2",
    borderRadius:3,
    marginBottom: 15,
    width: "90%",
  }
});


