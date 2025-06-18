import React from 'react'
import { View, Button, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import HomePagesData from '../../utils/HomePagesData'

export type RootStackParamList = {
    navigate: any;
  Home: undefined;
  AddContactScreen: undefined;
  ContactList: undefined
}

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>()

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
        persistentScrollbar
      >
        {HomePagesData.map(({ title, screen }, idx) => (
          <View key={idx} style={styles.buttonWrapper}>
            <Button
              title={title}
              onPress={() => {
                if (screen === 'Home') {
                  navigation.navigate('Home')
                } else {
                  navigation.navigate(screen as 'ContactList' | 'AddContactScreen')
                }
              }}            />
          </View>
        ))}      </ScrollView>
    </View>
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
