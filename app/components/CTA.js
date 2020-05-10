import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CombinedDefaultTheme, MainStyle, Colors } from "../theme";
export default function CTA({
  title,
  ctaText,
  onPress,
  style,
  titleStyle,
  ctaStyle,
}) {
  return (
    <View style={[styles.footer, style]}>
      {title && (
        <Text
          style={[styles.footerText, titleStyle, ctaText && { marginRight: 5 }]}
        >
          {title}
        </Text>
      )}

      {ctaText && (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.footerCTA, ctaStyle]}>{ctaText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

CTA.defaultProps = {
  title: null,
  ctaText: null,
  onPress: {},
  style: {},
  titleStyle: {},
  ctaStyle: {},
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    fontSize: 14,
    fontFamily: "Helvetica Neue",
    color: Colors.mainText,
  },

  footerCTA: {
    fontSize: 14,
    color: Colors.link,
    fontWeight: "500",
    fontFamily: "Helvetica Neue",
  },
});
