import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as imagePicker from "expo-image-picker";
import { useState } from "react";
const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectImage, setSelectedImage] = useState(null);

  const imagePickerHandler = async () => {
    try {
      const pickedImage = await imagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!pickedImage.canceled) {
        const { uri } = pickedImage.assets[0];
        setSelectedImage(uri);
        console.log(uri)
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          PlaceholderImage={PlaceholderImage}
          selectImage={selectImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          label="Choose a photo"
          theme="primary"
          imagePickerHandler={imagePickerHandler}
        />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    width: 320,
    height: 440,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
