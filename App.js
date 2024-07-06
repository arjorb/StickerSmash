import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

const PlaceholderImage = require("./assets/images/background-image.png");
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
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
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
});
