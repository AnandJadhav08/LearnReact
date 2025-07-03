// components/BookItem.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../types/book';

interface BookItemProps {
  book: Book;
  onPress: (book: Book) => void;
  onFavoritePress: (book: Book) => void;
  isFavorite: boolean;
}

export const BookItem: React.FC<BookItemProps> = ({
  book,
  onPress,
  onFavoritePress,
  isFavorite,
}) => {
  return (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => onPress(book)}
    >
      <View style={styles.bookImageContainer}>
        {book.imageLinks?.thumbnail ? (
          <Image
            source={{ uri: book.imageLinks.thumbnail }}
            style={styles.bookImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="book-outline" size={40} color="#666" />
          </View>
        )}
      </View>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.bookAuthors} numberOfLines={1}>
          {book.authors?.join(', ') || 'Unknown Author'}
        </Text>
        <Text style={styles.bookDate}>
          {book.publishedDate || 'Unknown Date'}
        </Text>
        {book.averageRating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{book.averageRating.toFixed(1)}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onFavoritePress(book)}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? '#FF4444' : '#666'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImageContainer: {
    marginRight: 15,
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 6,
  },
  placeholderImage: {
    width: 60,
    height: 90,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  bookAuthors: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  favoriteButton: {
    padding: 8,
  },
});