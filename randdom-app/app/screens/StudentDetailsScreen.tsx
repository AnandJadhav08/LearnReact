// screens/StudentDetailsScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Student } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentDetails'> & {
  updateStudent: (student: Student) => void;
};

const StudentDetailsScreen: React.FC<Props> = ({ route, navigation, updateStudent }) => {
  const { student: originalStudent } = route.params;
  const [student, setStudent] = useState<Student>({ ...originalStudent });
  const [newComment, setNewComment] = useState('');

  const handleSave = () => {
    updateStudent(student);
    Alert.alert('Success', 'Feedback saved');
    navigation.goBack();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setStudent(prev => ({
        ...prev,
        comments: [...prev.comments, newComment.trim()],
      }));
      setNewComment('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{student.name}</Text>
      <Text style={styles.detail}>Course: {student.course}</Text>
      <Text style={styles.detail}>Roll No: {student.roll}</Text>

      <TextInput
        style={styles.input}
        placeholder="Rating (1 to 5)"
        keyboardType="numeric"
        value={student.rating?.toString() ?? ''}
        onChangeText={text => setStudent({ ...student, rating: Number(text) })}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Feedback"
        multiline
        value={student.feedback ?? ''}
        onChangeText={text => setStudent({ ...student, feedback: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Add Comment" onPress={handleAddComment} />

      <Text style={styles.subheading}>Comments:</Text>
      <FlatList
        data={student.comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.comment}>• {item}</Text>}
        ListEmptyComponent={<Text>No comments yet.</Text>}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Save Feedback" onPress={handleSave} />
      </View>
    </View>
  );
};

export default StudentDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  subheading: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  comment: {
    fontSize: 14,
    marginTop: 4,
  },
});
