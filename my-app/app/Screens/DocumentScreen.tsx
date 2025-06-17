import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, StyleSheet, Text, View } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

type RootStackParamList = {
  navigate: any;
  Home: undefined
  Profile: undefined
  Document: undefined
}
type DocumentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'Document'>


const DocumentScreen: React.FC = () => {
  const navigation = useNavigation<DocumentScreenNavigationProp>()

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Document Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default DocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})