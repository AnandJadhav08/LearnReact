import React, { useRef, useState } from 'react';
import { useStats } from '../context/StatsContext';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  ImageBackground
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 40;

const HomeScreen = ({ navigation }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { stats } = useStats();

  const features = [
    {
      title: 'Caption Generator',
      description: 'Create engaging captions for your social media posts',
      icon: 'text-box',
      color: '#FF6B6B',
      screen: 'Caption' as keyof RootStackParamList,
      gradient: ['#FF6B6B', '#FF8E8E'],
      backgroundPattern: 'quotes',
      backgroundImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center', // Creative writing/content background
    },
    {
      title: 'Hashtag Generator',
      description: 'Generate trending hashtags to boost your reach',
      icon: 'animation-play',
      color: '#4ECDC4',
      screen: 'Hashtag' as keyof RootStackParamList,
      gradient: ['#4ECDC4', '#70E5DB'],
      backgroundPattern: 'hash',
      backgroundImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop&crop=center', // Social media/hashtag background
    },
    {
      title: 'Content Calendar',
      description: 'Plan and schedule your social media content',
      icon: 'calendar',
      color: '#45B7D1',
      screen: 'Calendar' as keyof RootStackParamList,
      gradient: ['#45B7D1', '#6BC5E0'],
      backgroundPattern: 'calendar',
      backgroundImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop&crop=center', // Calendar/planning background
    },
  ];

  // const stats = [
  //   { label: 'Captions Generated', value: '1+', color: '#FF6B6B' },
  //   { label: 'Hashtags Created', value: '1+', color: '#4ECDC4' },
  //   { label: 'Content Plans', value: '1+', color: '#45B7D1' },
  // ];

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderCarouselItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={[styles.carouselCard, { width: CARD_WIDTH }]}
      onPress={() => navigation.navigate(item.screen)}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: item.backgroundImage }}
        style={styles.cardBackground}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient overlay for better text readability */}
        <View style={[styles.gradientOverlay, { backgroundColor: item.color }]}>
          {/* Background Pattern */}
          <View style={styles.backgroundPattern}>
            {item.backgroundPattern === 'quotes' && (
              <>
                <MaterialCommunityIcons
                  name="format-quote-close"
                  size={120}
                  color="rgba(255,255,255,0.15)"
                  style={[styles.patternIcon, { top: -20, right: -10 }]}
                />
                <MaterialCommunityIcons
                  name="format-quote-open"
                  size={80}
                  color="rgba(255,255,255,0.1)"
                  style={[styles.patternIcon, { bottom: 10, left: 10 }]}
                />
              </>
            )}
            {item.backgroundPattern === 'hash' && (
              <>
                <Text style={[styles.hashPattern, { top: 20, right: 20 }]}>#</Text>
                <Text style={[styles.hashPattern, { top: 60, right: 60 }]}>#</Text>
                <Text style={[styles.hashPattern, { bottom: 40, left: 30 }]}>#</Text>
                <Text style={[styles.hashPattern, { bottom: 80, right: 40 }]}>#</Text>
              </>
            )}
            {item.backgroundPattern === 'calendar' && (
              <>
                <MaterialCommunityIcons
                  name="calendar-blank"
                  size={100}
                  color="rgba(0,0,0,0.15)"
                  style={[styles.patternIcon, { top: 10, right: 10 }]}
                />
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={60}
                  color="rgba(0,0,0,0.1)"
                  style={[styles.patternIcon, { bottom: 20, left: 20 }]}
                />
              </>
            )}
          </View>

          {/* Content */}
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={32}
                  color="#FFF"
                />
              </View>
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color="rgba(0,0,0,0.9)"
              />
            </View>

            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderPaginationDot = (index: number) => (
    <View
      key={index}
      style={[
        styles.paginationDot,
        index === currentIndex && styles.activeDot,
        { backgroundColor: features[currentIndex]?.color || '#C0C0C0' }
      ]}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.title}>AI Content Creator</Text>
            <Text style={styles.subtitle}>Your social media content companion</Text>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.profileAvatar}>
              <MaterialCommunityIcons name="account" size={24} color="#FFF" />
            </View>
          </View>
        </View>


        <View style={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}+</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Features Carousel Section */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>What would you like to create?</Text>

          <FlatList
            ref={flatListRef}
            data={features}
            renderItem={renderCarouselItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            contentContainerStyle={styles.carouselContainer}
            snapToInterval={CARD_WIDTH + 10}
            decelerationRate="fast"
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {features.map((_, index) => renderPaginationDot(index))}
          </View>
        </View>

        {/* Quick Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Pro Tips</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#FFB800" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipText}>
                Use a mix of high-traffic and low-competition hashtags for better reach!
              </Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <MaterialCommunityIcons name="target" size={20} color="#FF6B6B" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipText}>
                Plan your content calendar 7 days ahead for consistent posting.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  profileSection: {
    alignItems: 'center',
  },
  profileAvatar: {
    width: 50,
    height: 50,
    backgroundColor: '#6366F1',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  featuresContainer: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  carouselContainer: {
    paddingHorizontal: 20,
  },
  carouselCard: {
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardBackground: {
    flex: 1,
  },
  backgroundImage: {
    borderRadius: 24,
  },
  gradientOverlay: {
    flex: 1,
    position: 'relative',
    opacity: 0.95, // Slight transparency to show background image
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternIcon: {
    position: 'absolute',
  },
  hashPattern: {
    position: 'absolute',
    fontSize: 60,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.15)',
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardText: {
    marginTop: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,

  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 20,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  tipsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#FEF3C7',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

export default HomeScreen;