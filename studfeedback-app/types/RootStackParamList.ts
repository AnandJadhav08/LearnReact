import { StudentCardProps } from "./StudentCardProps";

export type RootStackParamList = {
  navigate: any;
  Home: undefined;
  AddStudent: undefined;
  StudentDetails: { student: StudentCardProps };
};