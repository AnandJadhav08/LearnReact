import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgetpwScreen from './screens/ForgetpwScreen';
import VerifyScreen from './screens/VerifyScreen';
import ResetpwScreen from  './screens/ResetpwScreen';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Forgetpw: undefined;
  Verify: undefined;
  Resetpw: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {

  return (
   
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false,}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false,}}/>
      <Stack.Screen name="Forgetpw" component={ForgetpwScreen} options={{headerShown: false,}}/>
      <Stack.Screen name="Verify" component={VerifyScreen} options={{headerShown: false,}}/>
      <Stack.Screen name="Resetpw" component={ResetpwScreen} options={{headerShown: false,}}/>
      </Stack.Navigator>


  )
}

export default App

