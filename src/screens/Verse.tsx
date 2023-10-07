import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { bibleAPIKey, bibleBaseAPIURL } from "../EnvironmentVariable";
import axios from "axios";
import { VerseStackProps as VerseStackProps } from "../types/NavigationProps";
import { ChapterInterface } from "../types/Types";
import { SafeAreaView } from "react-native-safe-area-context";

const Verse = ({ route }: VerseStackProps) => {
  const { book_id, chapter, verse } = route.params;

  const [singleVerse, setSingleVerse] = useState<ChapterInterface[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${bibleBaseAPIURL}/books-by-id/verse?bookId=${book_id}&chapterId=${chapter}&verseId=${verse}`,
        {
          headers: {
            "X-RapidAPI-Key": bibleAPIKey,
          },
        }
      );
      setSingleVerse(response.data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      {singleVerse !== undefined ? (
        <>
          <Text>{singleVerse[0]?.book_name}</Text>
          <Text>Chapter {singleVerse[0]?.chapter}</Text>
          <View>
            <Text>{singleVerse[0]?.verse} </Text>
            <Text>{singleVerse[0]?.text}</Text>
          </View>
        </>
      ) : (
        <Text>Loading</Text>
      )}
    </SafeAreaView>
  );
};

export default Verse;
