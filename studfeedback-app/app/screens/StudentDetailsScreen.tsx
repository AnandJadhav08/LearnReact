import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, TextInput, View, Button, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../types/RootStackParamList';
import { COLORS } from '../../utils/theme';
import { useStudents } from '../../context/StudentContext';

type StudentDetailsRouteProp = RouteProp<RootStackParamList, 'StudentDetails'>;

const StudentDetailsScreen: React.FC = () => {
  const { params } = useRoute<StudentDetailsRouteProp>();
  const { student } = params;
  const { updateStudent } = useStudents(); // We need this function
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [course, setCourse] = useState(student.course);
  const [roll, setRoll] = useState(student.roll);
  const [feedback, setFeedback] = useState(student.feedback);
  const [rating, setRating] = useState(String(student.rating));
  const [ratingError, setRatingError] = useState('');

  const handleUpdate = () => {
    if (!name || !course || !roll) {
      Alert.alert('Validation', 'Name, Course, and Roll are required');
      return;
    }

    updateStudent({
      ...student,
      name,
      course,
      roll,
      feedback,
      rating: parseFloat(rating),
    });
    
    Alert.alert('Updated', 'Student information updated.');
    setIsEditing(false);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Student Details</Text>

      {isEditing ? (
        <>
          <Label title="Name" />
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <Label title="Course" />
          <TextInput style={styles.input} value={course} onChangeText={setCourse} />
          <Label title="Roll Number" />
          <TextInput style={styles.input} value={roll} onChangeText={setRoll} />
          <Label title="Feedback" />
          <TextInput style={[styles.input, { height: 80 }]} multiline value={feedback} onChangeText={setFeedback} />
          <Label title="Rating (0–5)" />
          <TextInput
            style={styles.input}
            value={rating}
            onChangeText={(text) => {
              setRating(text);
              const numeric = parseInt(text, 10);
              
              if (text.trim() === '') {
                setRatingError('Rating is required');
              } else if (isNaN(numeric) || numeric < 1 || numeric > 5) {
                setRatingError('Rating must be between 1 and 5');
              } else {
                setRatingError('');
              }
            }}
            keyboardType="numeric"
            />
            {ratingError ? <Text style={{ color: 'red' }}>{ratingError}</Text> : null}
          <View style={styles.buttonRow}>
            <Button title="Save Changes" onPress={handleUpdate} />
            <Button title="Cancel" color="#999" onPress={() => setIsEditing(false)} />
          </View>
        </>
      ) : (
        <>
          <Label title="Name" />
          <Text style={styles.value}>{name}</Text>
          <Label title="Course" />
          <Text style={styles.value}>{course}</Text>
          <Label title="Roll Number" />
          <Text style={styles.value}>{roll}</Text>
          <Label title="Feedback" />
          <Text style={styles.value}>{feedback || 'No feedback provided.'}</Text>
          <Label title="Rating" />
          <Text style={styles.value}>{rating} / 5</Text>

          <View style={{ marginTop: 20 }}>
            <Button title="Edit" onPress={() => setIsEditing(true)} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const Label = ({ title }: { title: string }) => <Text style={styles.label}>{title}:</Text>;

export default StudentDetailsScreen;

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
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  buttonRow: {
    marginTop: 20,
    gap: 10,
  },
});
