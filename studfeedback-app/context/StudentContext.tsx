// src/context/StudentContext.tsx
import React, { createContext, useContext, useState } from 'react';

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
};


const StudentContext = createContext<StudentContextType | undefined>(undefined);


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
  const [students, setStudents] = useState<StudentCardProps[]>(initialStudents);

  const addStudent = (student: StudentCardProps) => {
    setStudents(prev => [...prev, student]);
  };
  
const updateStudent = (updatedStudent: StudentCardProps) => {
  setStudents(prev =>
    prev.map(student => (student.id === updatedStudent.id ? updatedStudent : student))
  );
};


  
  return (
    <StudentContext.Provider value={{ students, addStudent, updateStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudents must be used within a StudentProvider');
  return context;
};
