import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ImageViewer = ({ PlaceholderImage, selectImage }) => {
  return !selectImage ? (
    <Image source={PlaceholderImage} style={styles.image} />
  ) : (
    <Image source={{uri: selectImage} } style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
});

export default ImageViewer;
