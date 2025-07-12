import { ReactNode } from "react";

// types/book.ts
export interface Book {
  industryIdentifiers: boolean;
  subtitle: ReactNode;
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: {
    thumbnail?: string;
    small?: string;
  };
  previewLink?: string;
  infoLink?: string;
  publisher?: string;
  language?: string;
}

export interface GoogleBooksResponse {
  items?: {
    id: string;
    volumeInfo: Book;
  }[];
  totalItems: number;
}