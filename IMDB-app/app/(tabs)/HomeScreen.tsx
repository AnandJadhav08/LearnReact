import React, { JSX } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Carousel from 'react-native-reanimated-carousel';
import { useRouter } from 'expo-router';
import MovieCard from '@/components/MovieCard';
 import UpcomingMovies from '@/components/UpcomingMovies';
import PopularMovies from '@/components/PopularMovies';
import {featuredMovies, topMovies, upcomingMovies, recommendedMovies} from '@/utils/MovieData';
import TopTenMovies from '@/components/TopTenMovies';


export default function HomeScreen(): JSX.Element {

  const router = useRouter();


  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.header}>
          <Text style={styles.imdbLogo}>IMDb</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/Notification')}>
            <MaterialCommunityIcons name="bell" size={24} color="black" />
          </TouchableOpacity>
        </View>


        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          <View style={styles.carouselContainer}>
            <Carousel
              loop
              autoPlay
              autoPlayInterval={4000}
              width={Dimensions.get('window').width}
              height={300}
              data={featuredMovies}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <View style={styles.featuredSection}>
                  <Image source={{ uri: item.image }} style={styles.featuredImage} />
                  <View style={styles.featuredOverlay}>
                    <Text style={styles.featuredTitle}>{item.title}</Text>
                    <Text style={styles.featuredDescription}>{item.description}</Text>
                    <TouchableOpacity
                      style={styles.seeMoreButton}
                      onPress={() => router.push('/(tabs)/MovieDetail')}
                    >
                      <Text style={styles.seeMoreText}>See More</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>



          <View style={styles.section}>
            <View style={styles.dailyPick}>
              <Image
                source={{ uri: '' }}
                style={styles.dailyPickImage}
              />
              <View style={styles.dailyPickContent}>
                <Text style={styles.dailyPickDay}>Wednesday</Text>
                <Text style={styles.dailyPickDescription}>
                  Follows Wednesday Addams years as a student, when she attempts to master.
                </Text>
                <View style={styles.genreContainer}>
                  <Text style={styles.genreTag}>Adventure</Text>
                  <Text style={styles.genreTag}>Action</Text>
                </View>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top 10 Movies for you</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
            <TopTenMovies/>

            {/* <View style={styles.moviesScroll}>
              <FlatList
                data={topMovies}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <MovieCard title={item.title} image={item.image} />
                )}
              />
            </View> */}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Movies</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>

            <UpcomingMovies/>
            
            {/* <View style={styles.moviesScroll}>
              <FlatList
                data={upcomingMovies}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <MovieCard title={item.title} image={item.image}/>
                )}
              />
            </View> */}
          </View>


          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You might also like</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
              <PopularMovies/>

            {/* <View style={styles.moviesScroll}>
              <FlatList
                data={recommendedMovies}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <MovieCard title={item.title} image={item.image} />
                )}
              />
            </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#ffa600',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F5C842',
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
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  carouselContainer: {
  height: 300,
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
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
    padding: 16,
  },
  featuredTitle: {
    color: '#F5C842',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    zIndex: 2,
  },
  featuredDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 12,
    zIndex: 2,
  },
  seeMoreButton: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    color: '#000000',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  dailyPick: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  dailyPickImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 20,
  },
  dailyPickContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: 60,
  },
  dailyPickDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  dailyPickDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  genreTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    color: '#000000',
    marginRight: 8,
  },
  viewButton: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 12,
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

});