import React, { useEffect, useState } from 'react';
import {View,Text,TextInput,ScrollView,TouchableOpacity,Image,StyleSheet,StatusBar,SafeAreaView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ApiMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

const Browser: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Shows');
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState<ApiMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/tv/series_id/season/season_number/episode/episode_number/videos?language=en-US', {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTg1YjRmMTM1MWI1Y2QzYjdiM2FjNDJiZTgwZTc5NSIsIm5iZiI6MTc1MTM1ODk4Mi4wMjQ5OTk5LCJzdWIiOiI229wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aq0SKmVH5s03ypQyRo2j4-qk_P2IFoI92n9Yjq9XzVs",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results);
          setLoading(false);
        } else {
          console.log("data not found");
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const renderApiMovieItem = (item: ApiMovie) => (
    <TouchableOpacity key={item.id} style={styles.movieItem}>
      <Image 
        source={{ 
          uri: item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
            : 'https://via.placeholder.com/300x450?text=No+Image'
        }} 
        style={styles.movieImage} 
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>
          {item.title} {item.release_date && (`(${new Date(item.release_date).getFullYear()})`)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const getFilteredContent = () => {
    const searchQuery = searchText.toLowerCase();
    
    const filteredMovies = movies.filter(item =>
      item.title.toLowerCase().includes(searchQuery)
    );

    return filteredMovies;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading movies...</Text>
        </View>
      );
    }

    const filteredMovies = getFilteredContent();
    
    if (filteredMovies.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchText ? 'No movies found matching your search.' : 'No movies available.'}
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.moviesGrid}>
        {filteredMovies.map((item) => renderApiMovieItem(item))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, styles.tab, activeTab === 'All Shows' && styles.activeTab]} 
            onPress={() => setActiveTab('All Shows')}
          >
            <Text style={[styles.tabText, activeTab === 'All Shows' && styles.activeTabText]}>
              All Shows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, styles.tab, activeTab === 'Movies' && styles.activeTab]} 
            onPress={() => setActiveTab('Movies')} 
          >
            <Text style={[styles.tabText, activeTab === 'Movies' && styles.activeTabText]}>
              Movies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, styles.tab, activeTab === 'TV Shows' && styles.activeTab]} 
            onPress={() => setActiveTab('TV Shows')}
          >
            <Text style={[styles.tabText, activeTab === 'TV Shows' && styles.activeTabText]}>
              TV Shows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, styles.tab, activeTab === 'Streamings' && styles.activeTab]} 
            onPress={() => setActiveTab('Streamings')}
          >
            <Text style={[styles.tabText, activeTab === 'Streamings' && styles.activeTabText]}>
              Streamings
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 5,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginTop: 30,
  },
  searchIcon: {
    marginRight: 8,
    color: '#F5C842',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 8,
    marginTop: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
    gap: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffef85',
    backgroundColor: '#fdf5e2',
  },
  tabText: {
    fontSize: 14,
    color: '#f1ad0e',
    fontWeight: '400',
  },
  tab: {
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fdf5e2',
  },
  activeTab: {
    backgroundColor: '#F5C418',
    borderColor: '#F5C418',
  },
  activeTabText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  moviesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  movieItem: {
    width: '48%',
    marginBottom: 20,
  },
  movieImage: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  movieInfo: {
    marginTop: 8,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Browser;



// import React, { useState } from 'react';
// import {View,Text,TextInput,ScrollView,TouchableOpacity,StyleSheet,StatusBar,SafeAreaView, FlatList,} from 'react-native';
// import { moviesShows } from '@/components/MovieArray';  
// import { Ionicons } from '@expo/vector-icons';
// import ShowsCard from '@/components/ShowsCard';
// import { router } from 'expo-router';

// export type MovieShow = {
//   id: string;
//   title: string;
//   year?: string;
//   image: string;
// }

// const Browser: React.FC = () => {


//   const [activeTab, setActiveTab] = useState('All Shows');
//   const [searchText, setSearchText] = useState('');
 

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="white" />
      

//       <View style={styles.header}>
//         <View style={styles.searchContainer}>
//           <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search"
//             value={searchText}
//             onChangeText={setSearchText}
//             placeholderTextColor="#666"
//           />
//         </View>
//         <TouchableOpacity style={styles.filterButton} onPress={() => {router.push('/(tabs)/Filter')}}>
//           <Ionicons name="filter" size={20} color="#666" />
//         </TouchableOpacity>
//       </View>




//       <View style={styles.categoriesContainer}>
           
//                 <View style={styles.tabContainer}>
//                   <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'All Shows' && styles.activeTab]} onPress={() => setActiveTab('All Shows')}>
//                   <Text style={styles.tabText}>All Shows</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'Movies' && styles.activeTab]} onPress={() => setActiveTab('Movies')} >
//                     <Text style={styles.tabText}>Movies</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'TV Shows' && styles.activeTab]} onPress={() => setActiveTab('TV Shows')}>
//                     <Text style={styles.tabText}>TV Shows</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'Streamings' && styles.activeTab]} onPress={() => setActiveTab('Streamings')}>
//                     <Text style={styles.tabText}>Streamings</Text>
//                   </TouchableOpacity>
//                 </View>
//       </View>

     
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         <View style={styles.moviesGrid}>
//          <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
//       <FlatList
//         data={moviesShows}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//         renderItem={({ item }) => (
//           <ShowsCard
//             title={item.title}
//             image={item.image}
//             year={item.year}
//             onPress={() => console.log(`Pressed on ${item.title}`)}
//           />
//         )}
//       />
//     </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     gap: 12,
//   },
//     categoriesContainer: {
//     backgroundColor: '#FFFFFF',
//     paddingBottom: 5,
//   },
//   categoriesList: {
//     marginTop: 10,
//     paddingHorizontal: 10,
//   },
//    categoryButton: {
//     backgroundColor: '#fffbde',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 9,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#F5C842',
//     minWidth: 30,
//     alignItems: 'center',
//   },
//   categoryText: {
//     fontSize: 16,
//     color: '#F5C842',
//     fontWeight: '400',
//     alignContent: 'center',
//   },
//   searchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     paddingHorizontal: 18,
//     paddingVertical: 5,
//     marginTop: 30,
//   },
//   searchIcon: {
//     marginRight: 8,
//     color: '#F5C842',
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   filterButton: {
//     padding: 8,
//     marginTop: 30,
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     marginBottom: 24,
//   },
//   tabButton: {
//     flex: 1,
//     paddingVertical:10,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     marginRight: 5,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ffef85',
//     backgroundColor: '#edf0f2',
//   },
//   tabText: {
//     fontSize: 14,
//     color: '#ffe016',
//     fontWeight: '400',
//   },
//   tabsContainer: {
//     marginVertical: 8,
//   },
//   tabsContent: {
//     paddingHorizontal: 10,
//     gap: 8,
//   },
//   tab: {
//     paddingHorizontal: 5,
//     paddingVertical: 8,
//     borderRadius: 6,
//     backgroundColor: '#fff8c8',
//   },
//   activeTab: {
//     backgroundColor: '#FFA500',
//   },
//   activeTabText: {
//     color: '#FFFFFF',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   moviesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingBottom: 20,
//   },
  
// });

// export default Browser;