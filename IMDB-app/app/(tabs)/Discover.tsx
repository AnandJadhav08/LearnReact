import React, { JSX } from 'react';
import {View,Text,SafeAreaView,StatusBar,StyleSheet, ScrollView, Image,TouchableOpacity,FlatList} from 'react-native';
import MovieCard from '@/components/MovieCard';
// import { useRouter } from 'expo-router';


// interface MovieProps {
//   title: string;
//   image: string;
// }


// const MovieCard: React.FC<MovieProps> = ({ title, image }) => (
//   <TouchableOpacity style={styles.movieCard}>
//     <Image source={{ uri: image }} style={styles.movieImage} />
//     <Text style={styles.movieTitle}>{title}</Text>
//   </TouchableOpacity>
// );

export default function Discover(): JSX.Element {

   //const router = useRouter();

  const categories = ['Videos', 'TV Shows', 'Streaming', 'News'];

  const topMovies = [
    { title: 'Hawkeye', 
      image: 'https://cdn.marvel.com/content/1x/hawkeye_lob_crd_04.jpg'
     },
    { title: 'Thor: Love and Thunder', 
      image: 'https://m.media-amazon.com/images/M/MV5BZjRiMDhiZjQtNjk5Yi00ZDcwLTkyYTEtMDc1NjdmNjFhNGIzXkEyXkFqcGc@._V1_.jpg' 
    },
    { title: 'The Lord of the Rings', 
      image: 'https://tolkiengateway.net/w/images/thumb/5/5e/The_Lord_of_the_Rings_-_The_Return_of_the_King_-_Ensemble_poster.jpg/640px-The_Lord_of_the_Rings_-_The_Return_of_the_King_-_Ensemble_poster.jpg' 
    },
     { title: 'Avengers', 
      image: 'https://images1.wionews.com/images/ZB-EN/900x1600/2023/5/5/1683302779303_AvengersAgeofUltron.jpg' 
    },
  ];

  const upcomingMovies = [
    { title: 'Chhaava', 
      image: 'https://stat4.bollywoodhungama.in/wp-content/uploads/2023/10/Chhaava.jpg' 
    },
    { title: 'Inception', 
      image: 'https://c8.alamy.com/comp/2JH2PW0/movie-poster-inception-2010-2JH2PW0.jpg' 
    },
    { title: 'Avatar', 
      image: 'https://m.media-amazon.com/images/M/MV5BNmQxNjZlZTctMWJiMC00NGMxLWJjNTctNTFiNjA1Njk3ZDQ5XkEyXkFqcGc@._V1_.jpg' 
    },
    { title: 'Maleficent', 
      image: 'https://photogallery.indiatimes.com/movies/international/maleficent/photo/35618380/Poster-of-Hollywood-dark-fantasy-adventure-film-Maleficent-starring-Angelina-Jolie-.jpg' 
    },
  ];

  const recommendedMovies = [
    { title: 'Avengers', 
      image: 'https://images1.wionews.com/images/ZB-EN/900x1600/2023/5/5/1683302779303_AvengersAgeofUltron.jpg' 
    },
    { title: 'Maleficent', 
      image: 'https://photogallery.indiatimes.com/movies/international/maleficent/photo/35618380/Poster-of-Hollywood-dark-fantasy-adventure-film-Maleficent-starring-Angelina-Jolie-.jpg' 
    },
    { title: 'Jumanji', 
      image: 'https://qqcdnpictest.mxplay.com/pic/bce7ae02445dad432bdab581e180ceef/en/2x3/312x468/d5f863cd13cc307123989701f8b72fdf_1280x1920.webp' 
    },
    { title: 'Hawkeye', 
      image: 'https://cdn.marvel.com/content/1x/hawkeye_lob_crd_04.jpg'
     },
  ];


  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.categoryButton}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
        <View style={styles.header}>
          <Text style={styles.imdbLogo}>Discover</Text> 
        </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Most Watched Trailers</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
           <View style={styles.moviesScroll}>
      <FlatList
        data={topMovies}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard title={item.title} image={item.image} />
        )}
      />
    </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Most Watched Interviews</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
           <View style={styles.moviesScroll}>
      <FlatList
        data={upcomingMovies}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard title={item.title} image={item.image} />
        )}
      />
    </View>
          </View>


          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Most Watched TV shows</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
           <View style={styles.moviesScroll}>
      <FlatList
        data={recommendedMovies}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard title={item.title} image={item.image} />
        )}
      />
    </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  header: {
    backgroundColor: '#F5C842',
    paddingVertical: 30,
    marginTop: 28,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  imdbLogo: {
      fontSize: 24,
      fontWeight: 'bold',
    color: '#000000',
},
  headerIcons: {
      flexDirection: 'row',
    },
    categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 5,
  },
  categoriesList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  categoryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#F5C842',
    minWidth: 30,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#F5C842',
    fontWeight: '400',
    alignContent: 'center',

  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  section: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  seeMoreLink: {
    fontSize: 14,
    color: '#F5C842',
    fontWeight: '600',

  },
  moviesScroll: {
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
  },
  movieCard: {
    marginRight: 12,
    width: 120,
    backgroundColor: '#FFFFFF',
  },
  movieImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 16,
  },
});