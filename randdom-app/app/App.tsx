import React from 'react';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from '@react-navigation/native';
import Home from './(tabs)/Home';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export type RootStackParamList = {
  Home: undefined;
  Discover: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
 const App = () => {

  return (
   <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'
    screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#F5C518', 
        tabBarInactiveTintColor: '#FFFFFF', 
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 5,
        },
      }}>

      <Tab.Screen name="Home" 
      component={Home} 
      options={{ headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <TouchableOpacity onPress={() => router.push('/(tabs)/Home')}>
            <MaterialCommunityIcons 
              name={focused ? "home" : "home-outline"} 
              size={size || 26} 
              color={color} 
            />
            </TouchableOpacity>
          ),
       }} />

      {/* <Tab.Screen name="BrowserScreen"   
      component={BrowserScreen}   
      options={{ headerShown: false,
      tabBarIcon: ({ focused, color, size }) => (
          <TouchableOpacity onPress={() => router.push('/(tabs)/BrowserScreen')}>
            <MaterialCommunityIcons
              name={focused ? "magnify-plus" : "magnify"}
              size={size || 26}
              color={color}
            />
            </TouchableOpacity>
          ),
       }} />
      
       <Tab.Screen name="DiscoverScreen"   
      component={DiscoverScreen}   
      options={{ headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <TouchableOpacity onPress={() => router.push('/(tabs)/DiscoverScreen')}>
            <MaterialCommunityIcons
              name={focused ? "compass" : "compass-outline"}
              size={size || 26}
              color={color}
            />
            </TouchableOpacity>
          )

       }} />

       <Tab.Screen name="ProfileScreen"   
      component={ProfileScreen}   
      options={{ headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <TouchableOpacity onPress={() => router.push('/(tabs)/ProfileScreen')}>
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              size={size || 26}
              color={color}
            />
            </TouchableOpacity>
          )
       }} /> */}
    </Tab.Navigator>
   </NavigationContainer> 
  );

}

export default App;