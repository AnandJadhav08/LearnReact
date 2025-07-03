import { router } from 'expo-router';
import React, { JSX, useState } from 'react';
import {View,Text,SafeAreaView,StatusBar,StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import UpcomingMovies from '@/components/UpcomingMovies';
import TopTenMovies from '@/components/TopTenMovies';
import PopularMovies from '@/components/PopularMovies';


export default function Discover(): JSX.Element {

   //const router = useRouter();
    const [activeTab, setActiveTab] = useState('Viideos');;

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C418" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.imdbLogo}>Discover</Text> 
        </View>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
                     
                          <View style={styles.tabContainer}>
                            <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'Videos' && styles.activeTab]} onPress={() => router.push('/')}>
                            <Text style={styles.tabText}>Videos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'TV Shows' && styles.activeTab]} onPress={() => setActiveTab('TV Shows')} >
                              <Text style={styles.tabText}>TV Shows</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'Streamings' && styles.activeTab]} onPress={() => setActiveTab('Streamings')}>
                              <Text style={styles.tabText}>Streamings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'News' && styles.activeTab]} onPress={() => setActiveTab('News')}>
                              <Text style={styles.tabText}>News</Text>
                            </TouchableOpacity>
                          </View>
           

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trailers</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
           <TopTenMovies />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Interviews</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
           <PopularMovies />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>TV shows</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
            <UpcomingMovies />
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
    backgroundColor: '#F5C418',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  seeMoreLink: {
    fontSize: 14,
    color: '#F5C418',
    fontWeight: '600',

  },
  moviesScroll: {
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    marginTop: 28,
  },
  tabButton: {
    flex: 1,
    paddingVertical:10,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5C418',
    backgroundColor: '#edf0f2',
  },
  tabText: {
    fontSize: 14,
    color: '#F5C418',
    fontWeight: '400',
  },
  tabsContainer: {
    marginVertical: 15,
  },
  tabsContent: {
    paddingHorizontal: 10,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  activeTab: {
    backgroundColor: '#faf5bc',
  },
  activeTabText: {
    color: '#FFFFFF',
  },

});