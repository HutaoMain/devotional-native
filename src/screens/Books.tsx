import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import axios from "axios";
import { BooksInterface } from "../types/Types";
import BookCard from "../components/BookCard";
import { bibleAPIKey, bibleAPIURL } from "../EnvironmentVariable";
import { SafeAreaView } from "react-native-safe-area-context";

const Books = () => {
  const [books, setBooks] = useState<BooksInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${bibleAPIURL}`, {
        headers: {
          "api-key": bibleAPIKey,
        },
      });
      setBooks(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {books?.map((book, key) => (
          <BookCard key={key} books={book} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Books;
