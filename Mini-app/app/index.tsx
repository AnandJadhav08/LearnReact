import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Modal,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';



interface Book {
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

interface GoogleBooksResponse {
  items?: {
    id: string;
    volumeInfo: Book;
  }[];
  totalItems: number;
}

const FAVORITES_KEY = '@booknerd_favorites';

const BookNerdApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favoritesJson) {
        setFavorites(JSON.parse(favoritesJson));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: Book[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
      Alert.alert('Error', 'Failed to save favorites');
    }
  };

  const searchBooks = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=search+terms`
      );
      const data: GoogleBooksResponse = await response.json();

      if (data.items) {
        const formattedBooks: Book[] = data.items.map(item => ({
          ...item.volumeInfo,
          id: item.id,
        }));
        setBooks(formattedBooks);
      } else {
        setBooks([]);
        Alert.alert('No Results', 'No books found for your search');
      }
    } catch (error) {
      console.error('Error searching books:', error);
      Alert.alert('Error', 'Failed to search books. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (book: Book) => {
    const isFavorite = favorites.some(fav => fav.id === book.id);
    let newFavorites: Book[];

    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== book.id);
    } else {
      newFavorites = [...favorites, book];
    }

    saveFavorites(newFavorites);
  };

  const isFavorite = (bookId: string): boolean => {
    return favorites.some(fav => fav.id === bookId);
  };

  const openBookDetail = (book: Book) => {
    setSelectedBook(book);
    setDetailModalVisible(true);
  };

  const closeBookDetail = () => {
    setDetailModalVisible(false);
    setSelectedBook(null);
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => openBookDetail(item)}
    >
      <View style={styles.bookImageContainer}>
        {item.imageLinks?.thumbnail ? (
          <Image
            source={{ uri: item.imageLinks.thumbnail }}
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
          {item.title}
        </Text>
        <Text style={styles.bookAuthors} numberOfLines={1}>
          {item.authors?.join(', ') || 'Unknown Author'}
        </Text>
        <Text style={styles.bookDate}>
          {item.publishedDate || 'Unknown Date'}
        </Text>
        {item.averageRating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.averageRating.toFixed(1)}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons
          name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite(item.id) ? '#FF4444' : '#666'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderBookDetail = () => {
    if (!selectedBook) return null;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={detailModalVisible}
        onRequestClose={closeBookDetail}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeBookDetail}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Book Details</Text>
            <TouchableOpacity onPress={() => toggleFavorite(selectedBook)}>
              <Ionicons
                name={isFavorite(selectedBook.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite(selectedBook.id) ? '#FF4444' : '#666'}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.detailImageContainer}>
              {selectedBook.imageLinks?.thumbnail ? (
                <Image
                  source={{ uri: selectedBook.imageLinks.thumbnail }}
                  style={styles.detailImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.detailPlaceholder}>
                  <Ionicons name="book-outline" size={80} color="#666" />
                </View>
              )}
            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.detailTitle}>{selectedBook.title}</Text>
              
              {selectedBook.authors && (
                <View style={styles.detailRow}>
                  <Ionicons name="person-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>
                    {selectedBook.authors.join(', ')}
                  </Text>
                </View>
              )}

              {selectedBook.publisher && (
                <View style={styles.detailRow}>
                  <Ionicons name="business-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{selectedBook.publisher}</Text>
                </View>
              )}

              {selectedBook.publishedDate && (
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{selectedBook.publishedDate}</Text>
                </View>
              )}

              {selectedBook.pageCount && (
                <View style={styles.detailRow}>
                  <Ionicons name="document-text-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{selectedBook.pageCount} pages</Text>
                </View>
              )}

              {selectedBook.categories && (
                <View style={styles.detailRow}>
                  <Ionicons name="pricetag-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>
                    {selectedBook.categories.join(', ')}
                  </Text>
                </View>
              )}

              {selectedBook.averageRating && (
                <View style={styles.detailRow}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.detailText}>
                    {selectedBook.averageRating.toFixed(1)} 
                    {selectedBook.ratingsCount && ` (${selectedBook.ratingsCount} ratings)`}
                  </Text>
                </View>
              )}

              {selectedBook.language && (
                <View style={styles.detailRow}>
                  <Ionicons name="language-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{selectedBook.language}</Text>
                </View>
              )}

              {selectedBook.description && (
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionTitle}>Description</Text>
                  <Text style={styles.descriptionText}>
                    {selectedBook.description.replace(/<[^>]*>/g, '')}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const currentBooks = showFavorites ? favorites : books;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>📚 BookNerd</Text>
        <TouchableOpacity
          style={styles.favoritesToggle}
          onPress={() => setShowFavorites(!showFavorites)}
        >
          <Ionicons
            name={showFavorites ? 'search' : 'heart'}
            size={24}
            color={showFavorites ? '#666' : '#FF4444'}
          />
        </TouchableOpacity>
      </View>

      {!showFavorites && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for books..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={searchBooks}
            />
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={searchBooks}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          {showFavorites ? 'Your Favorites' : 'Search Results'}
        </Text>
        <Text style={styles.resultsCount}>
          {currentBooks.length} {currentBooks.length === 1 ? 'book' : 'books'}
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Searching books...</Text>
        </View>
      ) : (
        <FlatList
          data={currentBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.booksList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name={showFavorites ? 'heart-outline' : 'book-outline'}
                size={80}
                color="#ccc"
              />
              <Text style={styles.emptyText}>
                {showFavorites
                  ? 'No favorite books yet'
                  : 'Search for books to get started'}
              </Text>
            </View>
          }
        />
      )}

      {renderBookDetail()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  favoritesToggle: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  booksList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalContent: {
    flex: 1,
  },
  detailImageContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f9f9f9',
  },
  detailImage: {
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  detailPlaceholder: {
    width: 150,
    height: 225,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailInfo: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default BookNerdApp;