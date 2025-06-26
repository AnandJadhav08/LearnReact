import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreen from './(tabs)/SignUpScreen';
import SignInScreen from './(tabs)/SignInScreen';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator initialRouteName=''>
      <Tab.Screen name="SignIn" component={SignUpScreen} />
      <Tab.Screen name="SignUp" component={SignInScreen} />
    </Tab.Navigator>
  );
};

export default App;