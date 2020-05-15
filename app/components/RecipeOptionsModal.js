import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Text,
} from "react-native";
import { RECIPE_IMAGE_URL } from "../constants";

export default function RecipeOptionsModal(props) {
  const item = props.item;
  const title = item ? item.title : "";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setVisible(props.visible);
    }
    return () => (mounted = false);
  }, [props.visible]);

  function navToScene(option) {
    setVisible(false);
    props.onClose(false);
    if (option === "Edit") {
      props.navigation.push("UpdateRecipe", {
        screen: "UpdateRecipe",
        params: {
          id: item.id,
          title: item.title,
          content: item.content,
          images: pluckImages(item.RecipeImages),
          tags: pluckTagName(item.Tags),
        },
      });
    } else if (option === "View") {
      props.navigation.navigate("ViewRecipe", {
        id: item.id,
      });
    }
  }

  function pluckTagName(tagObjs) {
    if (!tagObjs) {
      return null;
    }

    let tagNames = [];
    tagNames = tagObjs.map((tag) => {
      return tag.name;
    });

    return tagNames;
  }

  function pluckImages(imageObjs) {
    if (!imageObjs) {
      return null;
    }

    let images = [];
    images = imageObjs.map((img) => {
      const path = img.path;
      return { uri: `${RECIPE_IMAGE_URL}/${path}`, uploaded: true };
    });

    return images;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <TouchableHighlight
            style={{ ...styles.modalButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              navToScene("Edit");
            }}
          >
            <Text style={styles.textStyle}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              ...styles.modalButton,
              backgroundColor: "#2196F3",
              marginBottom: 25,
            }}
            onPress={() => {
              navToScene("View");
            }}
          >
            <Text style={styles.textStyle}>View</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={{ ...styles.modalButton }}
            onPress={() => {
              props.onClose(false);
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    padding: 15,
    alignItems: "center",
    elevation: 5,
    alignSelf: "stretch",
  },
  modalButton: {
    backgroundColor: "grey",
    alignSelf: "stretch",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});
