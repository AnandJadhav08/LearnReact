// app/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import StudentCard from '../../components/StudentCard';
import { StudentCardProps } from '../../types/StudentCardProps';
import { COLORS } from '../../utils/theme';
import { useStudents } from '../../context/StudentContext';

type RootStackParamList = {
  Home: undefined;
  AddStudent: undefined;
  StudentDetails: { student: StudentCardProps };
};
type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavProp>();
  const { students, loading } = useStudents(); 

 
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loaderText}>Loading student data...</Text>
        <Text style={styles.loaderSubText}>Getting saved students from storage</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Students ({students.length})</Text>
          <Text style={styles.subtitle}>Data saved permanently</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddStudent')}
          style={styles.addButton}>
          <Text style={styles.addText}>+ Add Student</Text>
        </TouchableOpacity>
      </View>

      {students.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No students added yet</Text>
          <Text style={styles.emptySubText}>Tap Add Student to get started</Text>
        </View>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StudentCard
              student={item}
              onPress={() => navigation.navigate('StudentDetails', { student: item })}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loaderText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  loaderSubText: {
    marginTop: 5,
    fontSize: 14,
    color: COLORS.gray,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
});