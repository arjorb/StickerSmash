import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
const PlaceholderImage = require("./assets/images/background-image.png");
const ImageViewer = () => {
  return (
    <Image source={PlaceholderImage} style={styles.image}/>
  )
}

const styels = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 18,
    },
    })

export default ImageViewer