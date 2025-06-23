// screens/HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Student, Role } from '@/types';
import StudentCard from '@/components/StudentCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  role: Role | null;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
};

const HomeScreen: React.FC<Props> = ({ navigation, role, students, setStudents }) => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchText.toLowerCase()) ||
    student.roll.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading students...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name or roll no."
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />

      {role === 'student' && (
        <Button title="Add Yourself" onPress={() => navigation.navigate('AddStudent')} />
      )}

      <FlatList
        data={filteredStudents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onPress={() => {
              if (role === 'teacher') {
                navigation.navigate('StudentDetails', { student: item });
              }
            }}
            role={role}
          />
        )}
        ListEmptyComponent={<Text>No students found.</Text>}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    padding: 10,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
