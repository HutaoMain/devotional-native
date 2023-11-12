export interface BooksInterface {
  id: string;
  bibleId: string;
  abbreviation: string;
  name: string;
  nameLong: string;
}

export interface ChapterInterface {
  chapter: number;
  verse: number;
  text: string;
  book_id: string;
  book_name: string;
  tags: string[];
}

export interface DailyMessageInterface {
  chapter: number;
  verse: number;
  text: string;
  translation_id: string;
  book_id: string;
  book_name: string;
  tags: string[];
}

export interface BookMarkInterface {
  bookName: string;
  chapter: number;
  verseNumber: number;
  verseText: string;
}
