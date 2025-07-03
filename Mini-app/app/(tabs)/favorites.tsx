// app/(tabs)/favorites.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BookItem } from '../../components/BookItem';
import { FavoritesService } from '../../services/favoritesService';
import { Book } from '../../types/book';

const FavoritesScreen: React.FC = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const loadFavorites = async () => {
    try {
      const favoriteBooks = await FavoritesService.getFavorites();
      setFavorites(favoriteBooks);
    } catch (error) {
      console.error('Error loading favorites:', error);
      Alert.alert('Error', 'Failed to load favorites');
    }
  };

  // Load favorites when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadFavorites();
    setIsRefreshing(false);
  };

  const handleFavoritePress = async (book: Book) => {
    try {
      await FavoritesService.removeFavorite(book.id);
      setFavorites(prev => prev.filter(fav => fav.id !== book.id));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove from favorites');
    }
  };

  const handleBookPress = (book: Book) => {
    router.push({
      pathname: '/book-detail',
      params: { bookId: book.id }
    });
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <BookItem
      book={item}
      onPress={handleBookPress}
      onFavoritePress={handleFavoritePress}
      isFavorite={true}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>❤️ My Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} {favorites.length === 1 ? 'book' : 'books'}
        </Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.booksList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>No favorite books yet</Text>
            <Text style={styles.emptySubText}>
              Search for books and tap the heart to add them here
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  booksList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    fontWeight: '600',
  },
  emptySubText: {
    marginTop: 10,
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default FavoritesScreen;