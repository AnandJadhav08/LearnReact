import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Switch,
  TouchableOpacity,
} from 'react-native';

// Match the MyStudent interface from your backend
interface MyStudent {
  name: string;
  age: number;
  grade: string;
  course: string;
  isPassed: boolean;
}

export default function App() {
  const [formData, setFormData] = useState<MyStudent>({
    name: '',
    age: 0,
    grade: '',
    course: '',
    isPassed: false,
  });

  const handleChange = (field: keyof MyStudent, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: field === 'age' ? Number(value) || 0 : value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || formData.age <= 0 || !formData.grade.trim() || !formData.course.trim()) {
      Alert.alert('Error', 'Please fill in all required fields with valid values');
      return;
    }

    if (formData.age > 150 || formData.age < 1) {
      Alert.alert('Error', 'Please enter a valid age between 1 and 150');
      return;
    }

    try {
      console.log('Sending data:', formData);

      const response = await fetch('http://localhost:8000/api/students/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textData = await response.text();
        console.log('Non-JSON response:', textData);
        throw new Error('Server returned non-JSON response');
      }

      console.log('Response data:', data);

      if (response.ok) {
        Alert.alert('Success', 'Student created successfully!');
        setFormData({
          name: '',
          age: 0,
          grade: '',
          course: '',
          isPassed: false,
        });
      } else {
        const errorMessage = data.error || data.message || `Server error: ${response.status}`;
        Alert.alert('Error', errorMessage);
      }
    } catch (error: unknown) {
      console.error('Error details:', error);

      if (error instanceof TypeError && error.message.includes('Network request failed')) {
        Alert.alert('Network Error', 'Cannot connect to server. Please check if the server is running on http://localhost:8000');
      } else if (error instanceof SyntaxError) {
        Alert.alert('Error', 'Invalid server response format');
      } else if (error instanceof Error) {
        Alert.alert('Error', `Network or server error: ${error.message}`);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Student</Text>

      <View style={styles.formCard}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter student name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          maxLength={100}
        />

        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          keyboardType="numeric"
          value={formData.age === 0 ? '' : formData.age.toString()}
          onChangeText={(text) => handleChange('age', text)}
          maxLength={3}
        />

        <Text style={styles.label}>Grade *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter grade (e.g., A, B, C)"
          value={formData.grade}
          onChangeText={(text) => handleChange('grade', text)}
          maxLength={10}
        />

        <Text style={styles.label}>Course *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter course name"
          value={formData.course}
          onChangeText={(text) => handleChange('course', text)}
          maxLength={100}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Is Passed</Text>
          <Switch
            value={formData.isPassed}
            onValueChange={(value) => handleChange('isPassed', value)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Student</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginTop: 6,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
