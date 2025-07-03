// services/bookService.ts
import { Book, GoogleBooksResponse } from '../types/book';

export class BookService {
  private static readonly BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

  static async searchBooks(query: string): Promise<Book[]> {
    try {
      const response = await fetch(`${this.BASE_URL}?q=${encodeURIComponent(query)}&maxResults=20`);
      const data: GoogleBooksResponse = await response.json();

      if (data.items) {
        return data.items.map(item => ({
          ...item.volumeInfo,
          id: item.id,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error searching books:', error);
      throw new Error('Failed to search books');
    }
  }

  static async getBookById(id: string): Promise<Book | null> {
    try {
      const response = await fetch(`${this.BASE_URL}/${id}`);
      const data = await response.json();
      
      if (data.volumeInfo) {
        return {
          ...data.volumeInfo,
          id: data.id,
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw new Error('Failed to fetch book details');
    }
  }
}