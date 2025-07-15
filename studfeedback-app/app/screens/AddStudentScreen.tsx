// app/screens/AddStudentScreen.tsx
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {  TextInput,  Button,  ScrollView, StyleSheet, View,  Text,  TouchableOpacity,  Alert,  ActivityIndicator,} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useStudents } from '../../context/StudentContext';

export type RootStackParamList = {
  Home: undefined;
  AddStudent: undefined;
};

type AddStudentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddStudent'>;

const AddStudentScreen: React.FC = () => {
  const navigation = useNavigation<AddStudentScreenNavigationProp>();
  const { addStudent } = useStudents();

  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [roll, setRoll] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [saving, setSaving] = useState(false); 

  
  const handleSubmit = async () => {

    if (!name.trim() || !course.trim() || !roll.trim()) {
      Alert.alert('Missing Info', 'Name, Course, and Roll Number are required.');
      return;
    }

    try {
      setSaving(true);

    
      const newStudent = {
        id: Date.now().toString(), 
        name: name.trim(),
        course: course.trim(),
        roll: roll.trim(),
        feedback: feedback.trim(),
        rating: parseFloat(rating) || 0,
      };

      console.log('Submitting new student:', newStudent);

    
      await addStudent(newStudent);

    
      Alert.alert('Success', 'Student details saved permanently!', [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setCourse('');
            setRoll('');
            setFeedback('');
            setRating('');

            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('Error saving student:', error);
      Alert.alert('Error', 'Failed to save student details. Please try again.');
    } finally {
      setSaving(false); // Hide loading
    }
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
        editable={!saving}
      />

      <Text style={styles.label}>Course *</Text>
      <TextInput
        value={course}
        onChangeText={setCourse}
        placeholder="Enter course"
        style={styles.input}
        editable={!saving}
      />

      <Text style={styles.label}>Roll Number *</Text>
      <TextInput
        value={roll}
        onChangeText={setRoll}
        placeholder="Enter roll number"
        style={styles.input}
        editable={!saving}
      />

      <Text style={styles.label}>Feedback</Text>
      <TextInput
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Write feedback (optional)"
        multiline
        numberOfLines={3}
        style={[styles.input, { height: 80 }]}
        editable={!saving}
      />

      <Text style={styles.label}>Rating (0–5)</Text>
      <TextInput
        value={rating}
        onChangeText={setRating}
        placeholder="Enter rating (optional)"
        keyboardType="numeric"
        style={styles.input}
        editable={!saving}
      />

      <TouchableOpacity 
        style={[styles.submitButton, saving && styles.disabledButton]} 
        onPress={handleSubmit}
        disabled={saving} 
      >
        {saving ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.submitText}>Saving...</Text>
          </View>
        ) : (
          <Text style={styles.submitText}>Save Student Details</Text>
        )}
      </TouchableOpacity>

      <View style={styles.cancelButton}>
        <Button 
          title="Cancel" 
          color="#888" 
          onPress={() => navigation.goBack()}
          disabled={saving} 
        />
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
    marginTop: 40,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
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
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cancelButton: {
    marginTop: 15,
  },
});