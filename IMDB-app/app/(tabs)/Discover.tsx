import React, {JSX, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MovieCard from '@/components/MovieCard';

export default function Discover(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState('All');
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);

  const tabs = ['Videos', 'TV Shows', 'Streaming', 'News'];

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTg1YjRmMTM1MWI1Y2QzYjdiM2FjNDJiZTgwZTc5NSIsIm5iZiI6MTc1MTM1ODk4Mi4wMjQ5OTk5LCJzdWIiOiI229wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aq0SKmVH5s03ypQyRo2j4-qk_P2IFoI92n9Yjq9XzVs',
      };

      try {
        const [topRatedRes, upcomingRes, popularRes] = await Promise.all([
          fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', { headers }),
          fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', { headers }),
          fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', { headers }),
        ]);

        const topRatedData = await topRatedRes.json();
        const upcomingData = await upcomingRes.json();
        const popularData = await popularRes.json();

        setTopRated(topRatedData.results || []);
        setUpcoming(upcomingData.results || []);
        setPopular(popularData.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  const getFilteredData = () => {
    switch (selectedTab) {
      case 'Top Rated':
        return topRated;
      case 'Upcoming':
        return upcoming;
      case 'Popular':
        return popular;
      default:
        return [...topRated, ...upcoming, ...popular];
    }
  };

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
              data={tabs}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    selectedTab === item && { backgroundColor: '#F5C842' },
                  ]}
                  onPress={() => setSelectedTab(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedTab === item && { color: '#000', fontWeight: 'bold' },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>

         
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trailers</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.moviesScroll}>
              <FlatList
                data={getFilteredData()}
                keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <MovieCard
                    title={item.title}
                    image={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Image'
                    }
                  />
                )}
              />
            </View>
          </View>


          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Interviews</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.moviesScroll}>
              <FlatList
                data={getFilteredData()}
                keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <MovieCard
                    title={item.title}
                    image={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Image'
                    }
                  />
                )}
              />
            </View>
          </View>


          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>TV shows</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.moviesScroll}>
              <FlatList
                data={getFilteredData()}
                keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <MovieCard
                    title={item.title}
                    image={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Image'
                    }
                  />
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