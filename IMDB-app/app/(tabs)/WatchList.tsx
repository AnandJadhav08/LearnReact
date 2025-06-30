import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList,SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const collections = [
  { 
    id: '1', 
    title: 'All', 
    count: 15, 
    image: 'https://images.unsplash.com/photo-1497864979123-ef3595423b92?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ymx1ciUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
},
  { 
    id: '2', 
    title: 'Action', 
    count: 15, 
    image: 'https://www.shutterstock.com/image-photo/movie-theater-entrance-interior-blur-600nw-1819363976.jpg',
},
  { 
    id: '3', 
    title: 'Tv series', 
    count: 15, 
    image: 'https://images.pond5.com/hd-tv-studio-blurred-background-022288315_prevstill.jpeg',
},
  { 
    id: '4', 
    title: 'Horror Movies', 
    count: 15, 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZcRKGf379YN9t97k3oxiD-WJfliQDOSaqRQ&s', 
},
];

const suggestions = [
  {
    id: '1',
    title: 'Avengers', 
    image: 'https://images1.wionews.com/images/ZB-EN/900x1600/2023/5/5/1683302779303_AvengersAgeofUltron.jpg',
  },
  {
    id: '2',
    title: 'Maleficent', 
    image: 'https://photogallery.indiatimes.com/movies/international/maleficent/photo/35618380/Poster-of-Hollywood-dark-fantasy-adventure-film-Maleficent-starring-Angelina-Jolie-.jpg',
  },
  {
    id: '3',
    title: 'Jumanji', 
    image: 'https://qqcdnpictest.mxplay.com/pic/bce7ae02445dad432bdab581e180ceef/en/2x3/312x468/d5f863cd13cc307123989701f8b72fdf_1280x1920.webp',
  },
   { 
    id: '4',
    title: 'Hawkeye', 
    image: 'https://cdn.marvel.com/content/1x/hawkeye_lob_crd_04.jpg'
},
];

export default function Watchlist() {
  const router= useRouter();
  return (
   <View style={styles.outerContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
          <SafeAreaView style={styles.safeArea}>
      
            <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/MovieDetail')}>
          <MaterialCommunityIcons name="chevron-left" size={34} color="#000" />
        </TouchableOpacity>
        <Text style={styles.imdbLogo}>Watchlist</Text>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={() => router.push('/(tabs)/CollectionPage')}>
        <Text style={styles.createButtonText}>+  Create a collection</Text>
      </TouchableOpacity>

      <View style={styles.gridContainer}>
        {collections.map((item) => (
          <View key={item.id} style={styles.collectionCard}>
            <Image source={{ uri: item.image }} style={styles.collectionImage} />
            <View style={styles.overlay}>
              <Text style={styles.collectionText}>{item.title}</Text>
              <Text style={styles.collectionCount}>({item.count})</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.suggestionHeader}>
        <Text style={styles.suggestionTitle}>You might also like</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.suggestionCard}>
            <Image source={{ uri: item.image }} style={styles.suggestionImage} />
            <Text style={styles.suggestionText}>{item.title}</Text>
          </View>
        )}
      />
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imdbLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop:20,
  },

  backButton: {
    marginRight: 12,
    marginTop:20,
  },

  createButton: { 
    backgroundColor: 'black',
     margin: 15, borderRadius: 8,
      alignItems: 'center',
       padding: 12 ,
      },
  createButtonText: {
     color: 'white',
      fontSize: 16, 
      paddingHorizontal: 15,
     },
  gridContainer: { 
    flexDirection: 'row',
     flexWrap: 'wrap', 
     justifyContent: 'space-around',
     },
  collectionCard: {
    width: '45%',
    height: 160,
    marginVertical: 10,
    overflow: 'hidden',
    position: 'relative' ,
    },
  collectionImage: {
     width: '100%',
      height: '100%', 
      resizeMode: 'cover' ,
    },
  overlay: { 
    position: 'absolute',
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'center', 
    alignItems: 'center' ,
      },
  collectionText:
   { 
    color: 'white', 
    fontSize: 16,
    fontWeight: '600' ,
    },
  collectionCount: { 
    color: 'white', 
    fontSize: 14,
     marginTop: 4 ,
    },
  suggestionHeader: {
     flexDirection: 'row', 
     justifyContent: 'space-between', 
     alignItems: 'center',
      paddingHorizontal: 15,
       marginTop: 10 ,
      },
  suggestionTitle: {
    fontSize: 18, 
    fontWeight: 'bold',
    paddingBottom: 10,
     },
  seeMore: {
    color: '#F5A623',
     paddingBottom: 10,
    },
  suggestionCard: { 
    width: 120, 
    marginRight: 10,
   },
  suggestionImage: {
     width: '100%',
      height: 180, 
      borderRadius: 8 ,
    },
  suggestionText: {
     marginTop: 5, 
     fontSize: 14,
      textAlign: 'center',
     },
});