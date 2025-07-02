import React, { useState } from 'react';
import {View,Text,TextInput,ScrollView,TouchableOpacity,StyleSheet,StatusBar,SafeAreaView, FlatList,} from 'react-native';
import { moviesShows } from '@/components/MovieArray';  
import { Ionicons } from '@expo/vector-icons';
import ShowsCard from '@/components/ShowsCard';
import { router } from 'expo-router';

export type MovieShow = {
  id: string;
  title: string;
  year?: string;
  image: string;
}

const Browser: React.FC = () => {


  const [activeTab, setActiveTab] = useState('All Shows');
  const [searchText, setSearchText] = useState('');
 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      

      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => {router.push('/(tabs)/Filter')}}>
          <Ionicons name="filter" size={20} color="#666" />
        </TouchableOpacity>
      </View>




      <View style={styles.categoriesContainer}>
           
                <View style={styles.tabContainer}>
                  <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'All Shows' && styles.activeTab]} onPress={() => setActiveTab('All Shows')}>
                  <Text style={styles.tabText}>All Shows</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'Movies' && styles.activeTab]} onPress={() => setActiveTab('Movies')} >
                    <Text style={styles.tabText}>Movies</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'TV Shows' && styles.activeTab]} onPress={() => setActiveTab('TV Shows')}>
                    <Text style={styles.tabText}>TV Shows</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'Streamings' && styles.activeTab]} onPress={() => setActiveTab('Streamings')}>
                    <Text style={styles.tabText}>Streamings</Text>
                  </TouchableOpacity>
                </View>
      </View>

     
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.moviesGrid}>
         <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <FlatList
        data={moviesShows}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <ShowsCard
            title={item.title}
            image={item.image}
            year={item.year}
            onPress={() => console.log(`Pressed on ${item.title}`)}
          />
        )}
      />
    </View>
        </View>
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
  },
  categoriesList: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
   categoryButton: {
    backgroundColor: '#fffbde',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9,
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
  contentContainer: {
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical:10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffef85',
    backgroundColor: '#edf0f2',
  },
  tabText: {
    fontSize: 14,
    color: '#ffe016',
    fontWeight: '400',
  },
  tabsContainer: {
    marginVertical: 8,
  },
  tabsContent: {
    paddingHorizontal: 10,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fff8c8',
  },
  activeTab: {
    backgroundColor: '#FFA500',
  },
  activeTabText: {
    color: '#FFFFFF',
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
  
});

export default Browser;