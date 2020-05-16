import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, FAB, Title } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { createOrUpdateMessage} from "../../services/message";
import SnackBar from "../../components/SnackBar";

export default function AddDescription({ navigation, route }) {
  const [content, setContent] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    type: null,
    message: "",
  });

  function hideSnackbar() {
    setSnackbar({ ...snackbar, visible: false });
  }

  useEffect(() => {
    if (route.params?.receiver) {
      setReceiver(route.params.receiver);
    }
  }, [route.params]);

  async function sendMessage(receiverId, content) {
    const response = await createOrUpdateMessage({receiverId, content});
    if (response.error) {
        setSnackbar({
          visible: true,
          type: "error",
          message: response.message,
        });
      } else {
        setSnackbar({
          visible: true,
          type: "info",
          message: "Sent",
        });
        navigation.navigate("Message", { screen: "ViewMessage"});
      }
  }

  return (
    <>
      <ScrollView style={MainStyle.sceneContainer}>
        { (receiver) && (
            <Title style={ {textAlign: "center", marginBottom: 20, color: "#fff"}}>{ `TO: ${receiver.firstName} ${receiver.lastName}`}</Title>
        )}
        <View style={MainStyle.inputCard}>
          <TextInput
            label="Message Here"
            value={content}
            onChangeText={setContent}
            mode="flat"
            multiline
            style={MainStyle.textInput}
          />
        </View>
      </ScrollView>
      <SnackBar
        visible={snackbar.visible}
        type={snackbar.type}
        message={snackbar.message}
        onClose={hideSnackbar}
      />
      <FAB
        style={MainStyle.fab}
        small
        icon="check"
        color="#fff"
        onPress={() => sendMessage(receiver.id, content)}
      />
    </>
  );
}
