import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Button, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import HomePagesData from '../../utils/HomePagesData'


import CalculatorScreen from './CalculatorScreen'
import TaskScreen from './TaskScreen'
import UseEffectScreen from './useEffectScreen'
import LoginScreen from './LoginScreen'
import FlatlistScreen from './FlatlistScreen'


export type HomeStackParamList = {
  HomeMain: undefined
  Calculator: undefined
  Task: undefined
  UseEffect: undefined
  Login: undefined
  Flatlist: undefined
}

type HomeMainNavProp = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>

const HomeStack = createNativeStackNavigator<HomeStackParamList>()


const HomeMainScreen: React.FC = () => {
  const navigation = useNavigation<HomeMainNavProp>()

 
  const homeStackScreens = ['Calculator', 'Task', 'UseEffect', 'Login', 'Flatlist']
  const filteredPages = HomePagesData.filter(page => homeStackScreens.includes(page.screen))

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
        persistentScrollbar
      >
        {filteredPages.map(({ title, screen }, idx) => (
          <View key={idx} style={styles.buttonWrapper}>
            <Button
              title={title}
              onPress={() => {
                navigation.navigate(screen as keyof HomeStackParamList)
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}


const HomeScreen: React.FC = () => {
  return (
    <HomeStack.Navigator 
      initialRouteName="HomeMain"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#6200ea',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <HomeStack.Screen 
        name="HomeMain" 
        component={HomeMainScreen}
        options={{ 
          title: 'Home',
          headerShown: false,
        }}
      />
      <HomeStack.Screen 
        name="Calculator" 
        component={CalculatorScreen}
        options={{ 
          title: 'Calculator',
          headerBackTitle: 'Home'
        }}
      />
      <HomeStack.Screen 
        name="Task" 
        component={TaskScreen}
        options={{ 
          title: 'Tasks',
          headerBackTitle: 'Home'
        }}
      />
      <HomeStack.Screen 
        name="UseEffect" 
        component={UseEffectScreen}
        options={{ 
          title: 'UseEffect Demo',
          headerBackTitle: 'Home'
        }}
      />
      <HomeStack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ 
          title: 'Login',
          headerBackTitle: 'Home'
        }}
      />
      <HomeStack.Screen 
        name="Flatlist" 
        component={FlatlistScreen}
        options={{ 
          title: 'Flat List Demo',
          headerBackTitle: 'Home'
        }}
      />
    </HomeStack.Navigator>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  buttonWrapper: {
    marginVertical: 8,
  },
})