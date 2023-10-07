import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import axios from "axios";
import BookCard from "../components/BookCard";
import { bibleAPIKey, bibleBaseAPIURL } from "../EnvironmentVariable";
import { SafeAreaView } from "react-native-safe-area-context";
import BookSkeleton from "../skeletons/BookSkeleton";

const Books = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.get(`${bibleBaseAPIURL}/books`, {
        headers: {
          "X-RapidAPI-Key": bibleAPIKey,
        },
      });
      setBooks(response.data.The_Old_Testament);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {loading ? (
          <BookSkeleton />
        ) : (
          books?.map((book, key) => <BookCard key={key} books={book} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Books;
