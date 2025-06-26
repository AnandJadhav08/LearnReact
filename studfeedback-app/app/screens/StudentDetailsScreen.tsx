// app/screens/StudentDetailsScreen.tsx
import React, { useState } from 'react';
import {Text, StyleSheet, ScrollView, TextInput, View, Button, Alert, ActivityIndicator,} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../types/RootStackParamList';
import { COLORS } from '../../utils/theme';
import { useStudents } from '../../context/StudentContext';

type StudentDetailsRouteProp = RouteProp<RootStackParamList, 'StudentDetails'>;

const StudentDetailsScreen: React.FC = () => {
  const { params } = useRoute<StudentDetailsRouteProp>();
  const { student } = params;
  const { updateStudent } = useStudents();
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [course, setCourse] = useState(student.course);
  const [roll, setRoll] = useState(student.roll);
  const [feedback, setFeedback] = useState(student.feedback);
  const [rating, setRating] = useState(String(student.rating));
  const [ratingError, setRatingError] = useState('');
  const [updating, setUpdating] = useState(false); 

  const handleUpdate = async () => {
    if (!name.trim() || !course.trim() || !roll.trim()) {
      Alert.alert('Validation', 'Name, Course, and Roll are required');
      return;
    }

    const numericRating = parseFloat(rating);
    if (rating.trim() !== '' && (isNaN(numericRating) || numericRating < 0 || numericRating > 5)) {
      Alert.alert('Validation', 'Rating must be between 0 and 5');
      return;
    }

    try {
      setUpdating(true); 

      const updatedStudentData = {
        ...student,
        name: name.trim(),
        course: course.trim(),
        roll: roll.trim(),
        feedback: feedback.trim(),
        rating: numericRating || 0,
      };

      console.log('Updating student:', updatedStudentData);

      await updateStudent(updatedStudentData);

      
      Alert.alert('Success', 'Student information updated and saved permanently!', [
        {
          text: 'OK',
          onPress: () => setIsEditing(false),
        },
      ]);
    } catch (error) {
      console.error('Error updating student:', error);
      Alert.alert('Error', 'Failed to update student information. Please try again.');
    } finally {
      setUpdating(false); 
    }
  };

  
  const handleRatingChange = (text: string) => {
    setRating(text);
    
    if (text.trim() === '') {
      setRatingError('');
      return;
    }

    const numeric = parseFloat(text);
    
    if (isNaN(numeric)) {
      setRatingError('Rating must be a number');
    } else if (numeric < 0) {
      setRatingError('Rating cannot be negative');
    } else if (numeric > 5) {
      setRatingError('Rating cannot exceed 5');
    } else {
      setRatingError('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Student Details</Text>

      {isEditing ? (
        <>
          <Label title="Name" />
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName}
            editable={!updating}
          />
          
          <Label title="Course" />
          <TextInput 
            style={styles.input} 
            value={course} 
            onChangeText={setCourse}
            editable={!updating}
          />
          
          <Label title="Roll Number" />
          <TextInput 
            style={styles.input} 
            value={roll} 
            onChangeText={setRoll}
            editable={!updating}
          />
          
          <Label title="Feedback" />
          <TextInput 
            style={[styles.input, { height: 80 }]} 
            multiline 
            value={feedback} 
            onChangeText={setFeedback}
            editable={!updating}
          />
          
          <Label title="Rating (0–5)" />
          <TextInput
            style={styles.input}
            value={rating}
            onChangeText={handleRatingChange}
            keyboardType="numeric"
            editable={!updating}
          />
          {ratingError ? <Text style={styles.errorText}>{ratingError}</Text> : null}
          
          <View style={styles.buttonRow}>
            {updating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={styles.loadingText}>Updating...</Text>
              </View>
            ) : (
              <>
                <Button 
                  title="Save Changes" 
                  onPress={handleUpdate}
                  disabled={!!ratingError}
                />
                <Button 
                  title="Cancel" 
                  color="#999" 
                  onPress={() => {
                
                    setName(student.name);
                    setCourse(student.course);
                    setRoll(student.roll);
                    setFeedback(student.feedback);
                    setRating(String(student.rating));
                    setRatingError('');
                    setIsEditing(false);
                  }}
                />
              </>
            )}
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

          <View style={styles.editButtonContainer}>
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
    marginBottom: 10,
  },
  buttonRow: {
    marginTop: 20,
    gap: 10,
  },
  editButtonContainer: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
});