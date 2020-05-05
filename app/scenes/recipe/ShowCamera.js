import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { Input, Button, Icon } from "react-native-elements";

export default function ShowCamera(props) {
  const { navigation } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1, justifyContent: "flex-end" }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.toolbarContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.iconWrapper}>
              <Icon
                name="angle-double-left"
                type="font-awesome"
                style={{
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                color="#fff"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              if (cameraRef) {
                let image = await cameraRef.takePictureAsync();
                navigation.navigate("AddRecipeImages", { images: [image] });
              }
            }}
          >
            <View style={styles.iconWrapper}>
              <Icon
                name="camera"
                type="font-awesome"
                style={{
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                color="#fff"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Icon
              name="undo"
              type="font-awesome"
              style={{
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 120,
  },
  formContainer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  photoContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 30,
  },
  avatar: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },

  toolbarContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 3,
    padding: 10,
  },
  touchableButton: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    padding: 10,
  },
  iconWrapper: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  touchableIcon: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
});

ShowCamera.navigationOptions = ({}) => {
  return {
    title: `Update Name`,
  };
};
