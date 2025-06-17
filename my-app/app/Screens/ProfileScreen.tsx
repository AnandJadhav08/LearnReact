

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button,ScrollView, StyleSheet, Text, View } from 'react-native'
import StudentCards from '../../components/StudentCards';
import students from '../../utils/StudentData';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

type RootStackParamList = {
  navigate: any;
  Home: undefined
  Profile: undefined
}
type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'Profile'>

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>

      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {students.map((student) => (
            <StudentCards
              key={student.id}
              Name={student.Name}
              Stream={student.Stream}
              Qualities={student.Qualities}
              imageUri={student.imageUri}
              description={student.description}
            />
          ))}
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </ScrollView>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,            // fill remaining space
    width: '100%',      // full width
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,        // allows scrolling when content overflows
  },
})