import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import React from "react";

const BookSkeleton = () => {
  const numberOfSkeletons = 10;

  const skeletons = Array.from({ length: numberOfSkeletons }, (_, index) => (
    <TouchableOpacity key={index} style={styles.container}>
      <Text style={styles.title}></Text>
    </TouchableOpacity>
  ));

  return <View>{skeletons}</View>;
};

export default BookSkeleton;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
