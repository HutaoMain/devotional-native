import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import { BooksInterface } from "../types/Types";
import { useNavigation } from "@react-navigation/native";

interface Props {
  books: string;
}

const BookCard = ({ books }: Props) => {
  const navigation = useNavigation<any>();

  const handleNavigate = () => {
    navigation.navigate("Chapters", {
      book_name: books,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <Text style={styles.title}>{books}</Text>
    </TouchableOpacity>
  );
};

export default BookCard;

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
