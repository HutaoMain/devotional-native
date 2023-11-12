import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { bibleAPIKey, bibleBaseAPIURL } from "../EnvironmentVariable";
import axios from "axios";
import { VerseStackProps as VerseStackProps } from "../types/NavigationProps";
import { ChapterInterface } from "../types/Types";
import LoadingSpinner from "../loading/LoadingSpinner";
import Modal from "react-native-modal";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import useAuthStore from "../zustand/AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Verses = ({ route, navigation }: VerseStackProps) => {
  const { chapter, book_name } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [chapterVerses, setChapterVerses] = useState<ChapterInterface[]>([]);

  const user = useAuthStore((state) => state.user);

  const [selectedVerse, setSelectedVerse] = useState<ChapterInterface | null>(
    null
  );
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

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

  const handleVerseLongPress = (verseDetails: ChapterInterface) => {
    setSelectedVerse(verseDetails);
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
    setSelectedVerse(null);
  };

  // const handleBookmark = async () => {
  //   setLoading(true);
  //   const userBookmarkRef = doc(FIRESTORE_DB, "bookmarks", user || "");

  //   try {
  //     const userDocSnap = await getDoc(userBookmarkRef);

  //     if (!userDocSnap.exists()) {
  //       await setDoc(userBookmarkRef, {});
  //     }

  //     await addDoc(bibleBookmarkCollectionRef, {
  //       bookName: selectedVerse?.book_name,
  //       chapter: selectedVerse?.chapter,
  //       verseNumber: selectedVerse?.verse,
  //       verseText: selectedVerse?.text,
  //     });
  //     Toast.show({
  //       type: "success",
  //       text1: `Successful bookmark.`,
  //     });
  //     setLoading(false);
  //     handleCloseBottomSheet();
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  const handleBookmark = async () => {
    setLoading(true);

    try {
      const userKey = user ? `bookmarks_${user}` : "";

      // Get existing bookmarks from AsyncStorage
      const storedData = await AsyncStorage.getItem(userKey);

      // Parse JSON only if storedData is not null
      const existingBookmarks = storedData ? JSON.parse(storedData) : [];

      // Add the new bookmark to the list
      const newBookmark = {
        bookName: selectedVerse?.book_name,
        chapter: selectedVerse?.chapter,
        verseNumber: selectedVerse?.verse,
        verseText: selectedVerse?.text,
      };

      existingBookmarks.push(newBookmark);

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem(userKey, JSON.stringify(existingBookmarks));

      Toast.show({
        type: "success",
        text1: `Successful bookmark.`,
      });

      setLoading(false);
      handleCloseBottomSheet();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

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
                <TouchableWithoutFeedback
                  key={key}
                  onLongPress={() => handleVerseLongPress(item)}
                >
                  <Text>
                    <Text style={{ fontSize: 10, color: "gray" }}>
                      {item?.verse}{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        textDecorationLine:
                          selectedVerse?.text === item?.text
                            ? "underline"
                            : "none",
                      }}
                    >
                      {item?.text}{" "}
                    </Text>
                  </Text>
                </TouchableWithoutFeedback>
              ))}
            </Text>
          </View>

          <Modal
            isVisible={isBottomSheetVisible}
            onBackdropPress={handleCloseBottomSheet}
          >
            <View style={{ backgroundColor: "white", padding: 22 }}>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>
                <Text style={{ fontSize: 10, color: "gray" }}>
                  {" "}
                  {selectedVerse?.verse}
                </Text>{" "}
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  {selectedVerse?.text}
                </Text>
              </Text>
              <TouchableOpacity onPress={handleBookmark}>
                <Text style={{ fontSize: 18, color: "blue" }}>
                  {loading ? "Please wait.." : "Bookmark Verse"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCloseBottomSheet}>
                <Text style={{ fontSize: 18, color: "red", marginTop: 10 }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </ScrollView>
  );
};

export default Verses;
