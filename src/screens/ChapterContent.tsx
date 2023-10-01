// // screens/ChapterContentScreen.tsx
// import React, { useEffect, useState } from 'react';
// import { Text, View } from 'react-native';
// import { RouteProp } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { getChapterContent } from '../BibleService';
// import { HomeNavigationStackProps } from '../NavigationProps';

// type ChapterContentScreenRouteProp = RouteProp<HomeNavigationStackProps, 'ChapterContent'>;
// type ChapterContentScreenNavigationProp = NativeStackNavigationProp<HomeNavigationStackProps, 'ChapterContent'>;

// type Props = {
//   route: ChapterContentScreenRouteProp;
//   navigation: ChapterContentScreenNavigationProp;
// };

// const ChapterContentScreen = ({ route }: Props) => {
//   const [content, setContent] = useState('');
//   const { chapterId } = route.params;

//   useEffect(() => {
//     getChapterContent(chapterId).then(setContent);
//   }, [chapterId]);

//   return (
//     <View>
//       <Text>{content}</Text>
//     </View>
//   );
// };

// export default ChapterContentScreen;
