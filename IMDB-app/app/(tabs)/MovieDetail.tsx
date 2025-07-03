import React from 'react';
import {View,Text,ScrollView,Image,TouchableOpacity,SafeAreaView,StyleSheet,StatusBar,FlatList,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MovieCard from '@/components/MovieCard';

interface MovieItem {
  id: string;
  title: string;
  image: string;
}

interface ReviewItem {
  id: string;
  userName: string;
  userImage: string;
  review: string;
  rating: string;
}

const MovieDetail: React.FC = () => {
    const router = useRouter();
  const relatedMovies: MovieItem[] = [
    {
      id: '1',
      title: 'Avengers', 
      image: 'https://images1.wionews.com/images/ZB-EN/900x1600/2023/5/5/1683302779303_AvengersAgeofUltron.jpg' ,
    },
    {
      id: '2',
     title: 'Maleficent', 
      image: 'https://photogallery.indiatimes.com/movies/international/maleficent/photo/35618380/Poster-of-Hollywood-dark-fantasy-adventure-film-Maleficent-starring-Angelina-Jolie-.jpg' ,
    },
    {
      id: '3',
      title: 'Jumanji', 
      image: 'https://qqcdnpictest.mxplay.com/pic/bce7ae02445dad432bdab581e180ceef/en/2x3/312x468/d5f863cd13cc307123989701f8b72fdf_1280x1920.webp' ,
    },
    {
      id: '4',
     title: 'Hawkeye', 
      image: 'https://cdn.marvel.com/content/1x/hawkeye_lob_crd_04.jpg' ,
    },
  ];

  const reviews: ReviewItem[] = [
    {
      id: '1',
      userName: 'Jane Alexandre',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters.',
      rating: 'Promising',
    },
    {
      id: '2',
      userName: 'Jane Alex',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters.',
      rating: 'Promising',
    },
    {
      id: '3',
      userName: 'Jane Alexandre',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters.',
      rating: 'Promising',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <TouchableOpacity style={styles.backbutton} onPress={() => router.replace('/')}>
        <MaterialCommunityIcons  name= "chevron-left" size={34} color="#fff"/>
      </TouchableOpacity>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
     
        <View style={styles.featuredSection}>
          <Image
            source={{ 
              uri: 'https://m.media-amazon.com/images/S/pv-target-images/cd1315256292e7814afe0b8a5e25e6d2c752aea049deb5df61b6d3ebbbff777d.jpg' 
            }}
            style={styles.featuredImage}
          />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle}>House of the Dragon</Text>
            
            <View style={styles.movieStats}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#F5C842" />
                <Text style={styles.statText}>152 minutes</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="star" size={16} color="#F5C842" />
                <Text style={styles.statText}>7.0 (IMDb)</Text>
              </View>
            </View>
            
            <Text style={styles.featuredDescription}>
              An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.
            </Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
     
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tabButton} onPress={() => router.replace('/(tabs)/RatingPage')}>
              <Text style={styles.tabText}>Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} onPress={() => router.replace('/(tabs)/GuidePage')}>
              <Text style={styles.tabText}>Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabText}>Awards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} onPress={() => router.replace('/(tabs)/CastPage')}>
              <Text style={styles.tabText}>Cast</Text>
            </TouchableOpacity>
          </View>

        
          <View style={styles.detailsSection}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Release date</Text>
              <Text style={styles.detailValue}>December 9, 2017</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Creators:</Text>
              <Text style={styles.detailValue}>Ryan J. Condal/George R.R. Martin(based on Fire & Blood by)</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Stars:</Text>
              <View style={styles.starsRow}>
                <Text style={styles.detailValue}>Matt Smith/Rhys Ifans/Fabien Frankel</Text>
                <MaterialCommunityIcons name="chevron-right" size={25} color="#000000" />
              </View>
            </View>
          </View>

        
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => router.replace('/(tabs)/WatchList')}>
              <MaterialCommunityIcons name="plus" size={20} color="#000"/>
              <Text style={styles.primaryButtonText}>Watch list</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <MaterialCommunityIcons name="alarm" size={20} color="#000" />
              <Text style={styles.secondaryButtonText}>Set Reminder</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.screenshotsSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Image 
                source={{ uri: 'https://imgix.bustle.com/uploads/image/2022/10/18/172f177f-1916-42e8-a02c-c741749e065c-emma-d-arcy-1.jpg?w=374&h=285&fit=crop&crop=focalpoint&dpr=2&fp-x=0.5114&fp-y=0.2626' }} 
                style={styles.screenshot} 
              />
              <Image 
                source={{ uri: 'https://comicbook.com/wp-content/uploads/sites/4/2022/09/fa05626e-58a1-4abc-bd56-7ef32cc6a386.jpg' }} 
                style={styles.screenshot} 
              />
              <Image 
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe6bpTUOx9z9hIkrrdsHh6gmMHWuDdMzPSm-SoDQd5LrdLWEfXt47fTs24CHaEfz0WnbQ&usqp=CAU' }} 
                style={styles.screenshot} 
              />
            </ScrollView>
          </View>

      
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Rating & Review</Text>
              <TouchableOpacity>
                <MaterialCommunityIcons name="chevron-right" size={25} color="#000000" />
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Image source={{ uri: review.userImage }} style={styles.reviewUserImage} />
                    <View style={styles.reviewUserInfo}>
                      <Text style={styles.reviewUserName}>{review.userName}</Text>
                      <Text style={styles.reviewRating}>{review.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewText} numberOfLines={4}>
                    {review.review}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle1}>You might also like</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreText}>See More</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={relatedMovies}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
              <MovieCard title={item.title} image={item.image} />
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
    backgroundColor: '#000',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  featuredSection: {
    position: 'relative',
    height: 300,
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 20,
  },
  featuredTitle: {
    color: '#F5C842',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  backbutton: {
    marginRight:20,
    marginTop:30
  }, 
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 14,
    color: '#F5C842',
    marginLeft: 6,
    fontWeight: '400',
  },
  featuredDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
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
    paddingVertical:8,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginRight: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b1bcc6',
    backgroundColor: '#edf0f2',
  },
  tabText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '400',
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 35,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#F5C842',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#F5C842',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#F5C842',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    marginLeft: 8,
  },
  screenshotsSection: {
    marginBottom: 24,
  },
  screenshot: {
    width: 170,
    height: 110,
    marginRight: 10,
  },
  section: {
    marginBottom: 35,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#F5C842',
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
    width: 300,
    height: 200,
    borderWidth: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewUserImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    marginBottom: 3,
  },
  reviewRating: {
    fontSize: 15,
    color: '#000000',
  },
  reviewText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
  },
  horizontalList: {
    paddingRight: 20,
  },
  relatedMovieItem: {
    marginRight: 16,
    width: 110,
  },
  relatedMovieImage: {
    width: 110,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  relatedMovieTitle: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default MovieDetail;