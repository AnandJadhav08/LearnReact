// services/favoritesService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../types/book';

const FAVORITES_KEY = '@booknerd_favorites';

export class FavoritesService {
  static async getFavorites(): Promise<Book[]> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  static async addFavorite(book: Book): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = [...favorites, book];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw new Error('Failed to add to favorites');
    }
  }

  static async removeFavorite(bookId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter(book => book.id !== bookId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw new Error('Failed to remove from favorites');
    }
  }

  static async isFavorite(bookId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(book => book.id === bookId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  static async toggleFavorite(book: Book): Promise<boolean> {
    try {
      const isCurrentlyFavorite = await this.isFavorite(book.id);
      
      if (isCurrentlyFavorite) {
        await this.removeFavorite(book.id);
        return false;
      } else {
        await this.addFavorite(book);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw new Error('Failed to update favorites');
    }
  }
}