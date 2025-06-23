// types.ts

export type Role = 'student' | 'teacher';

export interface Student {
  id: string;
  name: string;
  course: string;
  roll: string;
  rating?: number;
  feedback?: string;
  comments: string[];
}
