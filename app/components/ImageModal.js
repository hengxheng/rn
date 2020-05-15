import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Text,
} from "react-native";

export default function ImageModal(props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setVisible(props.visible);
    }
    return () => (mounted = false);
  }, [props.visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableHighlight
            style={{ ...styles.modalButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              props.changeImageSource("camera");
            }}
          >
            <Text style={styles.textStyle}>Take a photo</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              ...styles.modalButton,
              backgroundColor: "#2196F3",
              marginBottom: 25,
            }}
            onPress={() => {
              props.changeImageSource("cameraRoll");
            }}
          >
            <Text style={styles.textStyle}>From Camera roll</Text>
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
    textAlign: "center",
  },
});
