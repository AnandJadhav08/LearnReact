import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


interface Movie {
  id: string;
  title: string;
  image: string;
  rating?: string;
  year?: string;
  genre?: string;
}

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');


  const featuredMovie: Movie = {
    id: '1',
    title: 'House of the Dragon',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffoxtelgroup.com.au%2Fnewsroom%2Ffoxtel-to-exclusively-premiere-house-of-the-dragon-in-4k-ultra-hd-in-australia&psig=AOvVaw3TOgeoDv5IQreRylJefNc_&ust=1751089444562000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDf_NH6kI4DFQAAAAAdAAAAABAE',
    rating: '8.5',
    year: '2022',
    genre: 'Drama, Fantasy',
  };

  const topMovies: Movie[] = [
    {
      id: '2',
      title: 'Hawkeye',
      image: 'https://www.google.com/imgres?q=Hawkeye%20poster%204k&imgurl=https%3A%2F%2Fcdn.marvel.com%2Fcontent%2F2x%2Fhawkeye_lob_crd_04.jpg&imgrefurl=https%3A%2F%2Fwww.marvel.com%2Ftv-shows%2Fhawkeye%2F1&docid=ZoL7PSMknAEjmM&tbnid=EP1enIJlBqnLrM&vet=12ahUKEwi6p52385COAxVDd2wGHSl_CBcQM3oECBgQAA..i&w=764&h=1132&hcb=2&ved=2ahUKEwi6p52385COAxVDd2wGHSl_CBcQM3oECBgQAA',
      rating: '7.5',
    },
    {
      id: '3',
      title: 'Thor: Love and Thunder',
      image: 'https://www.google.com/imgres?q=thor%20love%20and%20thunder%20poster%204k&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BZjRiMDhiZjQtNjk5Yi00ZDcwLTkyYTEtMDc1NjdmNjFhNGIzXkEyXkFqcGc%40._V1_.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt10648342%2F&docid=zcl14YWZgCO8kM&tbnid=n1BvSoy2EQRsqM&vet=12ahUKEwiu0dXX85COAxXoSmwGHW6DO14QM3oECBwQAA..i&w=1688&h=2500&hcb=2&ved=2ahUKEwiu0dXX85COAxXoSmwGHW6DO14QM3oECBwQAA',
      rating: '6.2',
    },
    {
      id: '4',
      title: 'The Lord of the Rings',
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fandango.com%2Fthe-lord-of-the-rings-the-return-of-the-king-2003-4k-remaster-223970%2Fmovie-photos-posters&psig=AOvVaw2NlkrL3MjSOjKwCFngRbtF&ust=1751089869945000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiOnpL6kI4DFQAAAAAdAAAAABAE',
      rating: '9.0',
    },
  ];

  const upcomingMovies: Movie[] = [
    {
      id: '5',
      title: 'Hawkeye',
      image: 'https://www.google.com/imgres?q=Hawkeye%20poster%204k&imgurl=https%3A%2F%2Fcdn.marvel.com%2Fcontent%2F2x%2Fhawkeye_lob_crd_04.jpg&imgrefurl=https%3A%2F%2Fwww.marvel.com%2Ftv-shows%2Fhawkeye%2F1&docid=ZoL7PSMknAEjmM&tbnid=EP1enIJlBqnLrM&vet=12ahUKEwi6p52385COAxVDd2wGHSl_CBcQM3oECBgQAA..i&w=764&h=1132&hcb=2&ved=2ahUKEwi6p52385COAxVDd2wGHSl_CBcQM3oECBgQAA',
      rating: '7.5',
    },
    {
      id: '6',
      title: 'Thor: Love and Thunder',
      image: 'https://www.google.com/imgres?q=thor%20love%20and%20thunder%20poster%204k&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BZjRiMDhiZjQtNjk5Yi00ZDcwLTkyYTEtMDc1NjdmNjFhNGIzXkEyXkFqcGc%40._V1_.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt10648342%2F&docid=zcl14YWZgCO8kM&tbnid=n1BvSoy2EQRsqM&vet=12ahUKEwiu0dXX85COAxXoSmwGHW6DO14QM3oECBwQAA..i&w=1688&h=2500&hcb=2&ved=2ahUKEwiu0dXX85COAxXoSmwGHW6DO14QM3oECBwQAA',
      rating: '6.2',
    },
    {
      id: '7',
      title: 'The Lord of the Rings',
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fandango.com%2Fthe-lord-of-the-rings-the-return-of-the-king-2003-4k-remaster-223970%2Fmovie-photos-posters&psig=AOvVaw2NlkrL3MjSOjKwCFngRbtF&ust=1751089869945000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiOnpL6kI4DFQAAAAAdAAAAABAE',
      rating: '9.0',
    },
  ];

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity style={styles.movieCard}>
      <Image source={{ uri: item.image }} style={styles.movieImage} />
      <Text style={styles.movieTitle} numberOfLines={2}>
        {item.title}
      </Text>
      {item.rating && (
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#F5C842" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
      
      <View style={styles.header}>
        <Text style={styles.imdbLogo}>IMDb</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
     
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search IMDb"
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

 
        <View style={styles.featuredSection}>
          <TouchableOpacity style={styles.featuredCard}>
            <Image source={{ uri: featuredMovie.image }} style={styles.featuredImage} />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>{featuredMovie.title}</Text>
              <Text style={styles.featuredSubtitle}>
                An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.
              </Text>
              <TouchableOpacity style={styles.seeMoreButton}>
                <Text style={styles.seeMoreText}>See More</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

   
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Wednesday</Text>
            <Text style={styles.sectionSubtitle}>Today Wednesday Adams wins over his enemies</Text>
          </View>
          <View style={styles.genreButtons}>
            <TouchableOpacity style={styles.genreButton}>
              <Text style={styles.genreButtonText}>Adventure</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.genreButton, styles.genreButtonActive]}>
              <Text style={[styles.genreButtonText, styles.genreButtonActiveText]}>Action</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.genreButton}>
              <Text style={styles.genreButtonText}>Drama</Text>
            </TouchableOpacity>
          </View>
        </View>

       
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithButton}>
            <Text style={styles.sectionTitle}>Top 10 Movies for you</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={topMovies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moviesList}
          />
        </View>

       
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithButton}>
            <Text style={styles.sectionTitle}>Upcoming Movies</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={upcomingMovies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moviesList}
          />
        </View>

     
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithButton}>
            <Text style={styles.sectionTitle}>You might also like</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={topMovies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => `${item.id}_similar`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moviesList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#F5C842',
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imdbLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  notificationIcon: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F5C842',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  featuredSection: {
    padding: 20,
  },
  featuredCard: {
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featuredContent: {
    padding: 15,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: 15,
  },
  seeMoreButton: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionHeaderWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  seeAllText: {
    fontSize: 14,
    color: '#F5C842',
    fontWeight: '600',
  },
  genreButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  genreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  genreButtonActive: {
    backgroundColor: '#F5C842',
    borderColor: '#F5C842',
  },
  genreButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  genreButtonActiveText: {
    color: '#000000',
    fontWeight: '600',
  },
  moviesList: {
    paddingRight: 20,
  },
  movieCard: {
    width: 120,
    marginRight: 15,
  },
  movieImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
});

export default HomeScreen;