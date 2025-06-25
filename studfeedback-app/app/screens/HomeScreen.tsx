import React, { useEffect, useState } from 'react';
import {  View,  Text,  FlatList,  StyleSheet,  TouchableOpacity,  ActivityIndicator,} from 'react-native';
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

const {students} = useStudents(); 

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loaderText}>Loading students...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Students ({students.length})</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddStudent')}
          style={styles.addButton}>
          <Text style={styles.addText}>+ Add Student</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onPress={() => navigation.navigate('StudentDetails', { student: item })}
          />
        )}
      />
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
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.gray,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
  },
});
