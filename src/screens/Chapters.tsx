import { Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { bibleAPIKey, bibleBaseAPIURL } from "../EnvironmentVariable";
import { ChaptersStackProps, VerseStackProps } from "../types/NavigationProps";
import { ChapterInterface } from "../types/Types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import LoadingSpinner from "../loading/LoadingSpinner";

const Chapters = ({ route }: ChaptersStackProps) => {
  const { book_name, book_id, chapter, verse } = route.params;

  const [chapters, setChapters] = useState<ChapterInterface[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<VerseStackProps["navigation"]>();

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `${bibleBaseAPIURL}/books-by-name?bookName=${book_name}`,
  //       {
  //         headers: {
  //           "X-RapidAPI-Key": bibleAPIKey,
  //         },
  //       }
  //     );
  //     setChapters(response.data);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.get(
        `${bibleBaseAPIURL}/books-by-name?bookName=${book_name}`,
        {
          headers: {
            "X-RapidAPI-Key": bibleAPIKey,
          },
        }
      );

      // Use a Set to store unique chapters
      const uniqueChapters = new Set<number>();
      const filteredChapters = response.data.filter(
        (item: ChapterInterface) => {
          if (!uniqueChapters.has(item.chapter)) {
            uniqueChapters.add(item.chapter);
            return true;
          }
          return false;
        }
      );

      setChapters(filteredChapters);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleNavigateToSpecificVerse = (
    book_id: string,
    chapter: number,
    verse: number,
    text: string,
    book_name: string,
    tags: string[]
  ) => {
    navigation.navigate("Verse", {
      chapter: chapter,
      verse: verse,
      text: text,
      book_id: book_id,
      book_name: book_name,
      tags: tags,
    });
  };

  const renderChapterItem = ({ item }: { item: ChapterInterface }) => {
    return (
      <TouchableOpacity
        style={styles.chapterBox}
        onPress={() =>
          handleNavigateToSpecificVerse(
            item.book_id,
            item.chapter,
            item.verse,
            item.text,
            item.book_name,
            item.tags
          )
        }
      >
        <Text style={styles.chapterText}>{item.chapter}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <Text style={{ fontSize: 20, textAlign: "center" }}>{book_name}</Text>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={chapters}
          renderItem={renderChapterItem}
          keyExtractor={(item) => item.text.toString()}
          numColumns={3}
        />
      )}
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
