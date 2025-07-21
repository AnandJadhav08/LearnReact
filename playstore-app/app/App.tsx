// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentCrud from './screens/StudentCrud'; // Make sure the path is correct


export type RootStackParamList = {
  AddStudent: undefined;
  ShowStudent: undefined;
  StudentCrud: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="ShowStudent">
    <Stack.Screen name="StudentCrud" component={StudentCrud} />
</Stack.Navigator>
    </NavigationContainer>
  );
}
