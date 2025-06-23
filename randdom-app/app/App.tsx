// App.tsx
import React, { useState } from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddStudentScreen from './screens/AddStudentScreen';
import StudentDetailsScreen from './screens/StudentDetailsScreen';
import { Student, Role } from '@/types';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddStudent: undefined;
  StudentDetails: { student: Student };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  const updateStudent = (updated: Student) => {
    setStudents(prev =>
      prev.map(s => (s.id === updated.id ? updated : s))
    );
  };

  return (
  
      <Stack.Navigator>
        <Stack.Screen name="Login">
         {props => (
            <LoginScreen
              {...props}
              setRole={setRole}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Home">
          {props => (
            <HomeScreen
              {...props}
              role={role}
              students={students}
              setStudents={setStudents}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddStudent">
          {props => (
            <AddStudentScreen
              {...props}
              addStudent={addStudent}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="StudentDetails">
          {props => (
            <StudentDetailsScreen
              {...props}
              updateStudent={updateStudent}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
  
  );
}
