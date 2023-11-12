// import React, { useEffect, useState } from "react";
// import { View, Text, ScrollView, TouchableOpacity } from "react-native";
// import { collection, getDocs } from "firebase/firestore";
// import { FIRESTORE_DB } from "../FirebaseConfig";
// import LoadingSpinner from "../loading/LoadingSpinner";
// import useAuthStore from "../zustand/AuthStore";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { BookMarkInterface } from "../types/Types";

// const Bookmarks = () => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [bookmarks, setBookmarks] = useState<BookMarkInterface[]>([]);

//   const user = useAuthStore((state) => state.user);

//   const bookmarksCollectionRef = collection(
//     FIRESTORE_DB,
//     `bookmarks/${user}/verses`
//   );

//   const fetchBookmarks = async () => {
//     try {
//       const bookmarksSnapshot = await getDocs(bookmarksCollectionRef);
//       const bookmarksData: BookMarkInterface[] = bookmarksSnapshot.docs.map(
//         (doc) =>
//           ({
//             bookName: doc.data().bookName,
//             chapter: doc.data().chapter,
//             verseNumber: doc.data().verseNumber,
//             verseText: doc.data().verseText,
//           } as BookMarkInterface)
//       );
//       setBookmarks(bookmarksData);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching bookmarks: ", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookmarks();
//   }, []);

//   return (
//     <SafeAreaView style={{ flex: 1, padding: 5 }}>
//       <ScrollView>
//         <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
//           <Text style={{ fontSize: 25, marginBottom: 10, fontWeight: "bold" }}>
//             Bookmarks
//           </Text>
//           {loading ? (
//             <LoadingSpinner />
//           ) : bookmarks.length === 0 ? (
//             <Text>No bookmarks found.</Text>
//           ) : (
//             bookmarks.map((bookmark, index) => (
//               <TouchableOpacity key={index} style={{ marginBottom: 10 }}>
//                 <View
//                   style={{
//                     width: "100%",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Text style={{ fontSize: 20 }}>{bookmark.bookName}</Text>
//                   <Text style={{ fontSize: 30 }}>{bookmark.chapter}</Text>
//                 </View>
//                 <Text style={{ fontSize: 16 }}>
//                   <Text style={{ fontSize: 10, color: "gray" }}>
//                     {bookmark.verseNumber}{" "}
//                   </Text>
//                   {bookmark.verseText}
//                 </Text>
//               </TouchableOpacity>
//             ))
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Bookmarks;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../loading/LoadingSpinner";
import useAuthStore from "../zustand/AuthStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookMarkInterface } from "../types/Types";

const Bookmarks = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [bookmarks, setBookmarks] = useState<BookMarkInterface[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);

  const fetchBookmarks = async () => {
    try {
      const userKey = `bookmarks_${user}`;
      const storedData = await AsyncStorage.getItem(userKey);

      if (storedData) {
        const bookmarksData: BookMarkInterface[] = JSON.parse(storedData);
        setBookmarks(bookmarksData);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookmarks: ", error);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);

    // Perform the refresh logic here
    fetchBookmarks();

    setRefreshing(false);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 5 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
          <Text style={{ fontSize: 25, marginBottom: 10, fontWeight: "bold" }}>
            Bookmarks
          </Text>
          {loading ? (
            <LoadingSpinner />
          ) : bookmarks.length === 0 ? (
            <Text>No bookmarks found.</Text>
          ) : (
            bookmarks.map((bookmark, index) => (
              <TouchableOpacity key={index} style={{ marginBottom: 10 }}>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{bookmark.bookName}</Text>
                  <Text style={{ fontSize: 30 }}>{bookmark.chapter}</Text>
                </View>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontSize: 10, color: "gray" }}>
                    {bookmark.verseNumber}{" "}
                  </Text>
                  {bookmark.verseText}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmarks;
