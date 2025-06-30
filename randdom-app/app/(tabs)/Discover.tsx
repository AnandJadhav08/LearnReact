import React, { JSX }  from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, SafeAreaView, FlatList, ScrollView  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';


interface MovieProps {
  title: string;
  image: string;
}

const MovieCard: React.FC<MovieProps> = ({ title, image }) => (
  <TouchableOpacity style={styles.movieCard}>
    <Image source={{ uri: image }} style={styles.movieImage} />
    <Text style={styles.movieTitle}>{title}</Text>
  </TouchableOpacity>
);

type DiscoverNavProp = NativeStackNavigationProp<RootStackParamList, 'Discover'>;

export default function HomeScreen(): JSX.Element { 

   const navigation = useNavigation<DiscoverNavProp>();

  // const router = useRouter();

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
     { title: 'The Suicide Squad', 
      image: 'https://bluraysforeveryone.com/cdn/shop/files/TheSuicideSquad4KFullSlipSteelBook_HongKong_-Front_2.png?v=1713313061&width=1445' 
    },
  ];

  const upcomingMovies = [
    { title: 'Chhaava', 
      image: 'https://stat4.bollywoodhungama.in/wp-content/uploads/2023/10/Chhaava.jpg' 
    },
    { title: 'Avatar', 
      image: 'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2022/08/AVATAR_RERLS_1SHT_DIGITAL_sRGB_V7.jpg' 
    },
    { title: 'Final Destination', 
      image: 'https://www.joblo.com/wp-content/uploads/2025/04/final-destination-bloodlines-new-poster-691x1024.jpg' 
    },
    { title: 'The Dark Knight Rises', 
      image: 'https://cdn.theplaylist.net/wp-content/uploads/2012/05/15053029/the-dark-knight-rises-final-poster.jpg' 
    },
   
  ];

  const recommendedMovies = [
    { title: 'Madame Web', 
      image: 'https://i0.wp.com/www.seenit.co.uk/wp-content/uploads/Madame-Web-Poster.jpg?resize=800%2C1000&ssl=1' 
    },
    { title: 'Quantemina', 
      image: 'https://thathashtagshow.com/wp-content/uploads/2023/01/ant-man-and-the-wasp-quantumania-poster-819x1024.jpg' 
    },
    { title: 'The Dark Knight Rises', 
      image: 'https://cdn.theplaylist.net/wp-content/uploads/2012/05/15053029/the-dark-knight-rises-final-poster.jpg' 
    },
     { title: 'Final Destination', 
      image: 'https://www.joblo.com/wp-content/uploads/2025/04/final-destination-bloodlines-new-poster-691x1024.jpg' 
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
        <View style={styles.header}>
          <Text style={styles.imdbLogo}>Discover</Text> 
        </View>

         <View style={styles.Inline}>
         <TouchableOpacity style={styles.seeMoreButton} >
              <Text style={styles.seeMoreLink}>Videos</Text>
         </TouchableOpacity>
           <TouchableOpacity style={styles.seeMoreButton} >
              <Text style={styles.seeMoreLink}>TV Shows</Text>
         </TouchableOpacity>
           <TouchableOpacity style={styles.seeMoreButton} >
              <Text style={styles.seeMoreLink}>Streamings</Text>
         </TouchableOpacity>
           <TouchableOpacity style={styles.seeMoreButton} >
              <Text style={styles.seeMoreLink}>News</Text>
         </TouchableOpacity>
         
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
      paddingVertical: 25,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  imdbLogo: {
      fontSize: 24,
      fontWeight: 'bold',
    color: '#000000',
},
  headerIcons: {
      flexDirection: 'row',
    },
  Inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
},
seeMoreButton: {
  backgroundColor: '#FFFFFF',
  paddingVertical: 10,
  paddingHorizontal:20,
  borderRadius: 7,
  borderColor: '#F5C842',
  borderWidth: 1,
},
seeMoreText: {
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 50,
  alignContent: 'center',
},
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  featuredSection: {
    position: 'relative',
    height: 300,
    backgroundColor: '#FFFFFF',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    zIndex: 2,
  },
  featuredSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
    zIndex: 2,
  },
  featuredDescription: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
    fontWeight: 'bold',
    zIndex: 2,
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






