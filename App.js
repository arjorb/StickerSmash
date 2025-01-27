import { StatusBar } from "expo-status-bar";
// import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as imagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  // SplashScreen.preventAutoHideAsync();
  // setTimeout(SplashScreen.hideAsync, 10000);

  const imagePickerHandler = async () => {
    try {
      const pickedImage = await imagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!pickedImage.canceled) {
        const { uri } = pickedImage.assets[0];
        setSelectedImage(uri);
        setShowAppOptions(true);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  if (status === null) {
    requestPermission();
  }

  const imageRef = useRef();

  return (
    <GestureHandlerRootView style={styles.container}>
      <View ref={imageRef} collapsable={false} style={styles.imageContainer}>
        <ImageViewer
          PlaceholderImage={PlaceholderImage}
          selectImage={selectImage}
        />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            imagePickerHandler={imagePickerHandler}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onCloseModal}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onCloseModal} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
