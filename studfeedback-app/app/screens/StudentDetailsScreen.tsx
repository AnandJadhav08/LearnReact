import React from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import type { RootStackParamList } from '../../types/RootStackParamList' // or define below if not split
import { COLORS } from '../../utils/theme'

type StudentDetailsRouteProp = RouteProp<RootStackParamList, 'StudentDetails'>

const StudentDetailsScreen: React.FC = () => {
  const { params } = useRoute<StudentDetailsRouteProp>()
  const { student } = params

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Student Details</Text>

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{student.name}</Text>

      <Text style={styles.label}>Course:</Text>
      <Text style={styles.value}>{student.course}</Text>

      <Text style={styles.label}>Roll Number:</Text>
      <Text style={styles.value}>{student.roll}</Text>

      <Text style={styles.label}>Feedback:</Text>
      <Text style={styles.value}>{student.feedback || 'No feedback provided.'}</Text>

      <Text style={styles.label}>Rating:</Text>
      <Text style={styles.value}>{student.rating} / 5</Text>
    </ScrollView>
  )
}

export default StudentDetailsScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: COLORS.text,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.gray,
  },
})
