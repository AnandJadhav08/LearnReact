import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//import { NavigationContainer } from '@react-navigation/native'
import AddContactScreen from './Screens/AddContactScreen'
import HomeScreen from './Screens/HomeScreen'
import ContactListScreen from './Screens/ContactListScreen'
import { ContactProvider } from '../context/ContactContext'

export type RootStackParamList = {
  Home: undefined
  AddContactScreen: undefined
  ContactList: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => (
  <ContactProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddContactScreen" component={AddContactScreen} />
        <Stack.Screen name="ContactList" component={ContactListScreen} />
      </Stack.Navigator>
  </ContactProvider>
)

export default App