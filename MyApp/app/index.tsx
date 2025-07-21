import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CaptionScreen from './screens/CaptionScreen';
import HashtagScreen from './screens/HashtagScreen';
import CalendarScreen from './screens/CalenderScreen';
import ProfileScreen from './screens/ProfileScreen';
import { RootStackParamList } from '../types/navigation';
import { StatsProvider } from './context/StatsContext';
//import { ThemeProvider, useTheme } from './context/ThemeContext';

const Tab = createBottomTabNavigator<RootStackParamList>();

const AppNavigator = () => {
//const { colors } = useTheme();

  return (
    <StatsProvider>
      {/* <ThemeProvider>
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> */}

          <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
              tabBarStyle: {
                backgroundColor: '#000000',
                borderTopWidth: 0,
                height: 100,
                paddingBottom: 10,
                paddingTop: 10,
              },
              tabBarShowLabel: false,
              tabBarActiveTintColor: '#FFFFFF',
              tabBarInactiveTintColor: '#FFFFFF',
            })}>

            <Tab.Screen
              name="Home"
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
              name="Caption"
              component={CaptionScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <View style={styles.tabItem}>
                    <MaterialCommunityIcons
                      name={focused ? "text-box" : "text-box-outline"}
                      size={28}
                      color={color}
                    />
                    <Text style={[styles.tabLabel, { color }]}>Caption</Text>
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="Hashtag"
              component={HashtagScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <View style={styles.tabItem}>
                    <MaterialCommunityIcons
                      name={focused ? "animation-play" : "animation-play-outline"}
                      size={28}
                      color={color}
                    />
                    <Text style={[styles.tabLabel, { color }]}>Hashtag</Text>
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <View style={styles.tabItem}>
                    <MaterialCommunityIcons
                      name={focused ? "calendar" : "calendar-outline"}
                      size={28}
                      color={color}
                    />
                    <Text style={[styles.tabLabel, { color }]}>Calendar</Text>
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
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
        {/* </SafeAreaView>
      </ThemeProvider> */}
    </StatsProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    marginBottom: 2,
  },
});

export default AppNavigator;


