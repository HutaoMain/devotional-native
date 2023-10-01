import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeNavigationStackProps = {
  Home: undefined;
  Books: {
    id: string;
    bibleId: string;
    abbreviation: string;
    name: string;
    nameLong: string;
  };
  Chapters: {
    id: string;
    bibleId: string;
    bookId: string;
    number: string;
    reference: string;
  };
  ChapterContent: undefined;
};

// use for route in books
export type BooksStackProps = NativeStackScreenProps<
  HomeNavigationStackProps,
  "Books"
>;

// use for route in books
export type ChaptersStackProps = NativeStackScreenProps<
  HomeNavigationStackProps,
  "Chapters"
>;

export type AuthStackNavigationType = {
  Login: undefined;
  Register: undefined;
};
