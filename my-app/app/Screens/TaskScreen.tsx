import React from 'react'
import {View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import TaskData from '../../utils/TaskData'

export type RootStackParamList = {
  Home: undefined
  Profile: undefined
  Document: { topic: string }
  Calculator: undefined
  Task: undefined
  Login: undefined
}

type TaskNavProp = NativeStackNavigationProp<RootStackParamList, 'Task'>



const TaskScreen: React.FC = () => {
  const navigation = useNavigation<TaskNavProp>()

  return (
    <View style={styles.container}>
    <ScrollView>
      <Text style={styles.title}>Tasks List</Text>
      {TaskData.map(({title,screen} ,index) => (
        <TouchableOpacity
        key={index}
        style={[styles.card, { backgroundColor: '#fff' }]}
        onPress={() => {
          if (screen === 'Document') {
              navigation.navigate('Document', { topic: title })
            } else {
              navigation.navigate(screen as 'Home' | 'Profile'| 'Login')
            }
          }}
          >
          <Text style={styles.cardText}>{title}</Text>
        </TouchableOpacity>
      ))}    </ScrollView>
      </View>
  )
}

export default TaskScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'stretch',
    backgroundColor: '#ffeccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '300',
    textAlign: 'left',
    fontFamily: 'sans-serif',
  },
})
