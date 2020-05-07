import { Platform } from "react-native";

export let font = Platform.OS === "ios" ? "HelveticaNeue" : "Roboto";
export let titleColor = "#363434";

//Nav Shared Styles
export let headerStyle = {
  backgroundColor: "#fff",
  borderBottomWidth: 0,
  shadowColor: "transparent",
};
export let headerTitleStyle = {
  fontWeight: "bold",
  fontSize: 17,
  fontFamily: font,
  color: titleColor,
};

export const imageOptions = { allowsEditing: true, aspect: [4, 3] };

export const Colors = {
  primaryIconButton: "#03DAC6",
};

export const chipContainer = {
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-start",
  flexWrap: "wrap",
  justifyContent: "flex-start",
};

export const tagStyle = {
    width: "auto",
    margin: 5,
}