// components/StudentCard.tsx

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Student, Role } from '../types';

type Props = {
  student: Student;
  onPress?: () => void;
  role: Role | null;
};

const StudentCard: React.FC<Props> = ({ student, onPress, role }) => {
  return (
    <TouchableOpacity onPress={role === 'teacher' ? onPress : undefined} style={styles.card}>
      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.detail}>Course: {student.course}</Text>
      <Text style={styles.detail}>Roll No: {student.roll}</Text>
      {role === 'teacher' && (
        <>
          <Text style={styles.detail}>Rating: {student.rating ?? 'Not rated'}</Text>
          <Text style={styles.detail}>Feedback: {student.feedback ?? 'No feedback yet'}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default StudentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    marginTop: 2,
  },
});
