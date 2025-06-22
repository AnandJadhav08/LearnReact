import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StudentCardProps } from '../types/StudentCardProps';
import RatingStars from '../components/RatingStars';
import { COLORS } from '../utils/theme';

type Props = {
  student: StudentCardProps;
  onPress: () => void;
};

const StudentCard = ({ student, onPress }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.name}>{student.name}</Text>
    <Text style={styles.meta}># Subject: {student.course}</Text>
    <Text style={styles.meta}># Roll: {student.roll}</Text>
    <Text style={styles.feedback}>{student.feedback}</Text>
    <RatingStars rating={student.rating} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  meta: {
    fontSize: 14,
    color: COLORS.gray,
  },
  feedback: {
    marginVertical: 8,
    fontSize: 14,
    color: COLORS.text,
  },
});

export default StudentCard;
