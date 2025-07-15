
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddStudentScreen from './screens/AddStudentScreen';
import StudentDetailsScreen from './screens/StudentDetailsScreen';
import { StudentProvider } from '../context/StudentContext'; 
import { StudentCardProps } from '../types/StudentCardProps';


export type RootStackParamList = {
  navigate: any;
  Home: undefined;
  AddStudent: undefined;
  StudentDetails: { student: StudentCardProps };

};


const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
   return (

  <StudentProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown: false,}}/>
          <Stack.Screen name="AddStudent" component={AddStudentScreen} options={{headerShown: false,}}/>
         <Stack.Screen name="StudentDetails" component={StudentDetailsScreen} options={{headerShown: false,}}/>
       </Stack.Navigator>
    </StudentProvider>

 );
};
export default App;

