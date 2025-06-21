import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {Alert, Button, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContacts } from '../../context/ContactContext';


export type RootStackParamList = {
  AddContactScreen: undefined
  Home: undefined
  ContactList: undefined
}

type ContactListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ContactList'>

const ContactListScreen: React.FC = () => {
   const navigation = useNavigation<ContactListScreenNavigationProp>()
  const { contacts } = useContacts()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact List</Text>

      <FlatList
        data={contacts}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => Alert.alert(
              'Contact Details',
              `${item.name}\n${item.phone}\n${item.email}\n${item.workplace}}`,
            )}
          >
            <Text style={styles.cardText}>{item.name}{"\n"}{item.phone}</Text>
      
          </TouchableOpacity>
        )}      />
        <View style={styles.button}>
          <Button title="Add Contact" onPress={() => navigation.navigate('AddContactScreen')} />
        </View>
        <Button title=" Go To Home" onPress={() => navigation.navigate('Home')} />
    </View>
  )
}
export default ContactListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
    backgroundColor: '#fff',
  },

  button:{
   backgroundColor: '#007BFF',
  },
  listContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    padding: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  cardText: {
    backgroundColor: '#fff',
    fontSize: 18,
    color: '#000',
    fontWeight: '300',
    textAlign: 'left',
    padding: 16, 
    fontFamily: 'sans-serif',
    marginBottom: 5,
    
  },
})
