import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {Alert, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
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
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardText}>{item.phone}</Text>
      
          </TouchableOpacity>
        )}      />
    </View>
  )
}

export default ContactListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, // Important for FlatList to scroll properly
    padding: 16,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#96add9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '300',
    textAlign: 'left',
  },
})
