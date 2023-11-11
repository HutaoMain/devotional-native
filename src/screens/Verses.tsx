import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { bibleAPIKey, bibleBaseAPIURL } from "../EnvironmentVariable";
import axios from "axios";
import { VerseStackProps as VerseStackProps } from "../types/NavigationProps";
import { ChapterInterface } from "../types/Types";
import LoadingSpinner from "../loading/LoadingSpinner";

const Verses = ({ route, navigation }: VerseStackProps) => {
  const { chapter, book_name } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [chapterVerses, setChapterVerses] = useState<ChapterInterface[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.get(
        `${bibleBaseAPIURL}/books-by-name/chapter?bookName=${book_name}&chapterId=${chapter}`,
        {
          headers: {
            "X-RapidAPI-Key": bibleAPIKey,
          },
        }
      );
      setChapterVerses(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    loading
      ? navigation.setOptions({
          title: "Loading",
        })
      : navigation.setOptions({
          title: `${chapterVerses[0]?.book_name} ${chapterVerses[0]?.chapter}`,
        });
  }, [navigation, chapterVerses, loading]);

  return (
    <ScrollView style={{ flex: 1 }}>
      {!loading ? (
        <>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>{book_name}</Text>
            <Text style={{ fontSize: 30 }}>{chapter}</Text>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <Text>
              {chapterVerses?.map((item, key) => (
                <Text key={key}>
                  <Text style={{ fontSize: 10, color: "gray" }}>
                    {item?.verse}{" "}
                  </Text>
                  <Text style={{ fontSize: 16 }}>{item?.text} </Text>
                </Text>
              ))}
            </Text>
          </View>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </ScrollView>
  );
};

export default Verses;
