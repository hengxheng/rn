import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

export default function SnackBar(props) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info"); //info, error, warning

  function _onToggleSnackBar(){
    setVisible(!visible);
  }

  function _onDismissSnackBar(){
    setVisible(false);
    props.onClose();
  }

  useEffect(() => {
    setVisible(props.visible);
    if(props.message){
        setMessage(props.message);
    }
    
    if(props.type){
        setType(props.type);
    }
  }, [props]);

  return (
    <Snackbar
      visible={visible}
      onDismiss={ () => _onDismissSnackBar() }
        duration={ 3000 }
      style={ { ...styles.container, ...styles[type] }}
    >
      {message}
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 5,
  },
  info: {
    backgroundColor: "green",
    color: "#fff",
  },
  error: {
    backgroundColor: "red",
    color: "#fff",
  },
  warning: {
    backgroundColor: "yellow",
    color: "#fff",
  },
});
