import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ImageViewer = ({ PlaceholderImageSource }) => {
  return <Image source={PlaceholderImageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
});

export default ImageViewer;
