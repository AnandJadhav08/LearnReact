// context/StudentContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type StudentCardProps = {
  id: string;
  name: string;
  course: string;
  roll: string;
  feedback: string;
  rating: number;
};

type StudentContextType = {
  students: StudentCardProps[];
  addStudent: (student: StudentCardProps) => void;
  updateStudent: (student: StudentCardProps) => void;
  loading: boolean; 
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);


const STUDENTS_STORAGE_KEY = '@students_data';


const initialStudents: StudentCardProps[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    course: 'Computer Science',
    roll: 'CS001',
    feedback: 'Excellent performance in programming assignments.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Bob Smith',
    course: 'Mathematics',
    roll: 'MATH002',
    feedback: 'Good understanding of concepts but needs more practice.',
    rating: 3,
  },
  {
    id: '3',
    name: 'Carol Davis',
    course: 'Physics',
    roll: 'PHY003',
    feedback: 'Outstanding lab work and theoretical knowledge.',
    rating: 5,
  },
];

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentCardProps[]>([]);
  const [loading, setLoading] = useState(true);


  const loadStudents = async () => {
    try {
      setLoading(true);
      console.log('Loading students from storage...');
      
    
      const storedStudents = await AsyncStorage.getItem(STUDENTS_STORAGE_KEY);
      
      if (storedStudents !== null) {
        const parsedStudents = JSON.parse(storedStudents);
        console.log('Students loaded from storage:', parsedStudents.length);
        setStudents(parsedStudents);
      } else {
        console.log('No stored data found, using initial data');
        setStudents(initialStudents);
        await saveStudentsToStorage(initialStudents);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents(initialStudents);
    } finally {
      setLoading(false);
    }
  };


  const saveStudentsToStorage = async (studentsData: StudentCardProps[]) => {
    try {
      console.log('Saving students to storage:', studentsData.length);
      await AsyncStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(studentsData));
      console.log('Students saved successfully');
    } catch (error) {
      console.error('Error saving students:', error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);


  const addStudent = async (student: StudentCardProps) => {
    try {
      console.log('Adding new student:', student.name);
      
      const newStudents = [...students, student];
      setStudents(newStudents);
      
      await saveStudentsToStorage(newStudents);
      console.log('Student added and saved successfully');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const updateStudent = async (updatedStudent: StudentCardProps) => {
    try {
      console.log('Updating student:', updatedStudent.name);
      

      const updatedStudents = students.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      );
      setStudents(updatedStudents);
      
  
      await saveStudentsToStorage(updatedStudents);
      console.log('Student updated and saved successfully');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <StudentContext.Provider value={{ 
      students, 
      addStudent, 
      updateStudent, 
      loading 
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudents must be used within a StudentProvider');
  return context;
};