import React, { useState } from 'react';
import {View,Text,ScrollView,TouchableOpacity,SafeAreaView,StyleSheet,StatusBar,Image,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ReviewItem {
  id: string;
  userName: string;
  userImage: string;
  review: string;
  rating: string;
}

const RatingPage: React.FC = () => {
    const  router = useRouter();
  const [userRating, setUserRating] = useState(0);

  const reviews: ReviewItem[] = [
    {
      id: '1',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
    {
      id: '2',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
    {
      id: '3',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
    {
      id: '4',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
    {
      id: '5',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
    {
      id: '6',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
  ];

  const renderStars = (rating: number, size: number = 16, interactive: boolean = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => interactive && setUserRating(i)}
          disabled={!interactive}
        >
          <MaterialCommunityIcons
            name={i <= rating ? 'star' : 'star-outline'}
            size={20}
            color={i <= rating ? '#FFD700' : '#DDD'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const renderRatingBar = (stars: number, percentage: number) => (
    <View style={styles.ratingBarContainer}>
      <View style={styles.starsContainer}>
        {renderStars(stars, 14)}
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
        </View>
      </View>
    </View>
  );

  const renderReview = (review: ReviewItem) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: review.userImage }} style={styles.reviewUserImage} />
        <View style={styles.reviewUserInfo}>
          <Text style={styles.reviewUserName}>{review.userName}</Text>
          <Text style={styles.reviewRating}>{review.rating}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.review}</Text>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
          <SafeAreaView style={styles.safeArea}>
      
            <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/MovieDetail')}>
          <MaterialCommunityIcons name="chevron-left" size={34} color="#000" />
        </TouchableOpacity>
        <Text style={styles.imdbLogo}>Rating & Review</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
       
        <View style={styles.ratingSection}>
          <View style={styles.mainRatingContainer}>
           
            <View style={styles.leftRatingInfo}>
              <Text style={styles.ratingLabel}>Rating</Text>
              <View style={styles.ratingWithStar}>
                <MaterialCommunityIcons name="star" size={23} color="#FFD700" />
              </View>
              <View style={styles.ratingWithStar}>
                <Text style={styles.ratingValue}>7.0 (IMDb)</Text>
              </View>
            </View>
            
          
            <View style={styles.rightRatingBars}>
              {renderRatingBar(5, 45)}
              {renderRatingBar(4, 25)}
              {renderRatingBar(3, 15)}
              {renderRatingBar(2, 10)}
              {renderRatingBar(1, 5)}
            </View>
          </View>

      
          <View style={styles.userRatingSection}>
            <Text style={styles.tapToRateText}>Tap to rate:</Text>
            <Text style={styles.userStarsContainer}>
              {renderStars(userRating, 28, true)}
            </Text>
          </View>

        
          <TouchableOpacity style={styles.writeReviewButton}>
            <Text style={styles.writeReviewText}>Write a review</Text>
            <MaterialCommunityIcons name="pencil" size={16} color="#000" />
          </TouchableOpacity>
        </View>

   
        <View style={styles.reviewsContainer}>
          {reviews.map(renderReview)}
        </View>
      </ScrollView>
    </SafeAreaView>
    </View>
  );
};

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
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ratingSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  mainRatingContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  leftRatingInfo: {
    width: 120,
    paddingRight: 16,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 17,
  },
  ratingWithStar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17, 
  },
  ratingValue: {
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
  },
  rightRatingBars: {
    flex: 1,
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  starsContainer: {
    flexDirection: 'row',
    width: 80,
  },
  progressBarContainer: {
    flex: 1,
    marginLeft: 28,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F5C842',
    borderRadius: 3,
  },
  userRatingSection: {
    marginBottom: 20,
    justifyContent:'space-between',
    flexDirection:'row'
  },
  tapToRateText: {
    fontSize: 15,
    color: 'bold',
    fontWeight: '500',
  },
  userStarsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  writeReviewText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginRight: 8,
    textDecorationLine: 'underline',
  },
  reviewsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
    marginTop: 2,
    marginBottom:5,
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  reviewRating: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default RatingPage;