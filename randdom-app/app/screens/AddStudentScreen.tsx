// screens/AddStudentScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Student } from '@/types';
import { v4 as uuidv4 } from 'uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'AddStudent'> & {
  addStudent: (student: Student) => void;
};

const AddStudentScreen: React.FC<Props> = ({ navigation, addStudent }) => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [roll, setRoll] = useState('');

  const handleAdd = () => {
    if (!name || !course || !roll) {
      Alert.alert('All fields are required');
      return;
    }

    const newStudent: Student = {
      id: uuidv4(),
      name,
      course,
      roll,
      comments: [],
    };

    addStudent(newStudent);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
        style={styles.input}
      />
      <TextInput
        placeholder="Roll Number"
        value={roll}
        onChangeText={setRoll}
        style={styles.input}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
};

export default AddStudentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
