import { Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { bibleAPIKey, bibleBaseAPIURL } from "../EnvironmentVariable";
import { ChaptersStackProps } from "../types/NavigationProps";
import { ChapterInterface } from "../types/Types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Chapters = ({ route }: ChaptersStackProps) => {
  const { book_name, book_id, chapter, verse } = route.params;

  const [chapters, setChapters] = useState<ChapterInterface[]>([]);

  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${bibleBaseAPIURL}/books-by-name?bookName=${book_name}`,
        {
          headers: {
            "X-RapidAPI-Key": bibleAPIKey,
          },
        }
      );
      setChapters(response.data);
    };
    fetchData();
  }, []);

  const handleNavigateToSpecificVerse = (
    book_id: string,
    chapter: number,
    verse: number
  ) => {
    navigation.navigate("ChapterContent", {
      book_id: book_id,
      chapter: chapter,
      verse: verse,
    });
  };

  const renderChapterItem = ({ item }: { item: ChapterInterface }) => {
    return (
      <TouchableOpacity
        style={styles.chapterBox}
        onPress={() =>
          handleNavigateToSpecificVerse(item.book_id, item.chapter, item.verse)
        }
      >
        <Text style={styles.chapterText}>
          {item.chapter}:{item.verse}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <Text style={{ fontSize: 20, textAlign: "center" }}>{book_name}</Text>
      <FlatList
        data={chapters}
        renderItem={renderChapterItem}
        keyExtractor={(item) => item.text.toString()}
        numColumns={3}
      />
    </SafeAreaView>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  chapterBox: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  chapterText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
