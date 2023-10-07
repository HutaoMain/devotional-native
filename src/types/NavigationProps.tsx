import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeNavigationStackProps = {
  Home: undefined;
  Books: undefined;
  Chapters: {
    chapter: number;
    verse: number;
    text: string;
    book_id: string;
    book_name: string;
    tags: string[];
  };
  Verse: {
    chapter: number;
    verse: number;
    text: string;
    book_id: string;
    book_name: string;
    tags: string[];
  };
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

export type VerseStackProps = NativeStackScreenProps<
  HomeNavigationStackProps,
  "Verse"
>;

export type AuthStackNavigationType = {
  Login: undefined;
  Register: undefined;
};
