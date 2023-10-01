import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import { BooksInterface } from "../types/Types";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { BooksStackProps } from "../types/NavigationProps";

interface Props {
  books: BooksInterface;
}

const BookCard = ({ books }: Props) => {
  const navigation = useNavigation<BooksStackProps["navigation"]>();

  const handleNavigate = () => {
    navigation.navigate("Books", {
      id: books.id,
      bibleId: books.bibleId,
      abbreviation: books.abbreviation,
      name: books.name,
      nameLong: books.nameLong,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <Text style={styles.title}>{books.name}</Text>
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
