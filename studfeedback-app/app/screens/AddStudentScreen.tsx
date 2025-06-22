import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {  TextInput,  Button,  ScrollView,  StyleSheet,  View,  Text,  TouchableOpacity,  Alert,} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useStudents } from '../../context/StudentContext'; 

// Define navigation type
export type RootStackParamList = {
  Home: undefined;
  AddStudent: undefined;
};

type AddStudentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddStudent'
>;

const AddStudentScreen: React.FC = () => {
  const navigation = useNavigation<AddStudentScreenNavigationProp>();
  const { addStudent } = useStudents(); // ✅ Get method from context

  // Form state
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [roll, setRoll] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');

  // Handle form submit
  const handleSubmit = () => {
    if (!name.trim() || !course.trim() || !roll.trim()) {
      Alert.alert('Missing Info', 'Name, Course, and Roll Number are required.');
      return;
    }

    const newStudent = {
      id: Date.now().toString(), // unique ID
      name,
      course,
      roll,
      feedback,
      rating: parseFloat(rating) || 0,
    };

    addStudent(newStudent); // ✅ Save to context
    Alert.alert('Success', 'Student details saved.');

    // Reset form
    setName('');
    setCourse('');
    setRoll('');
    setFeedback('');
    setRating('');

    navigation.navigate('Home'); // ✅ Go back to Home
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Student</Text>

      <Text style={styles.label}>Name *</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter full name"
        style={styles.input}
      />

      <Text style={styles.label}>Course *</Text>
      <TextInput
        value={course}
        onChangeText={setCourse}
        placeholder="Enter course"
        style={styles.input}
      />

      <Text style={styles.label}>Roll Number *</Text>
      <TextInput
        value={roll}
        onChangeText={setRoll}
        placeholder="Enter roll number"
        style={styles.input}
      />

      <Text style={styles.label}>Feedback</Text>
      <TextInput
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Write feedback"
        multiline
        numberOfLines={3}
        style={[styles.input, { height: 80 }]}
      />

      <Text style={styles.label}>Rating (0–5)</Text>
      <TextInput
        value={rating}
        onChangeText={setRating}
        placeholder="Enter rating"
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Save Student Details</Text>
      </TouchableOpacity>

      <View style={styles.cancelButton}>
        <Button title="Cancel" color="#888" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

export default AddStudentScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 15,
  },
});
