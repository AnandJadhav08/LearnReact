import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import HomeScreen from './(tabs)/HomeScreen';
import Profile from './(tabs)/Profile';
import Discover from './(tabs)/Discover';
import Browser from './(tabs)/Browser';

const Tab = createBottomTabNavigator();

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#F5C842" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
    
      const userToken = await AsyncStorage.getItem('userToken');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userData = await AsyncStorage.getItem('userData');

      if (userToken || isLoggedIn === 'true' || userData) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace('/(tabs)/SignInScreen');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      router.replace('/(tabs)/SignInScreen');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Tab.Navigator 
      initialRouteName='HomeScreen'
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFD700', 
        tabBarInactiveTintColor: '#FFFFFF', 
      })}
    >
      <Tab.Screen 
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.tabItem}>
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={28}
                color={color}
              />
              <Text style={[styles.tabLabel, { color }]}>Home</Text>
            </View>
          ),
        }} 
      />

      <Tab.Screen 
        name="Browser"
        component={Browser}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.tabItem}>
              <MaterialCommunityIcons
                name={focused ? "magnify" : "magnify"}
                size={28}
                color={color}
              />
              <Text style={[styles.tabLabel, { color }]}>Browser</Text>
            </View>
          ),
        }} 
      />

      <Tab.Screen 
        name="Discover"
        component={Discover}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.tabItem, focused && styles.activeTab]}>
              <View style={focused ? styles.activeIconContainer : null}>
                <MaterialCommunityIcons
                  name="compass"
                  size={28}
                  color={color}
                />
              </View>
              <Text style={[styles.tabLabel, { color }]}>Discover</Text>
            </View>
          ),
        }} 
      />

      <Tab.Screen 
        name="Profile"
        component={Profile}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.tabItem}>
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                size={28}
                color={color}
              />
              <Text style={[styles.tabLabel, { color }]}>Profile</Text>
            </View>
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },
  tabLabel: {
    fontSize: 8,
    marginTop: 4,
    fontWeight: '500',
  },
  activeTab: {
    position: 'relative',
  },
  activeIconContainer: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    padding: 8,
    marginBottom: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
});