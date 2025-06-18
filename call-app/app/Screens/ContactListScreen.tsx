import React from 'react'
import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useContacts } from '../../context/ContactContext';
const ContactListScreen: React.FC = () => {
  const { contacts } = useContacts()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact List</Text>
      {contacts.map((contact, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: '#96add9' }]}
        >
          <Text style={styles.cardText}>{contact.name}</Text>
          <Text style={styles.cardText}>{contact.phone}</Text>
          {contact.email ? <Text style={styles.cardText}>{contact.email}</Text> : null}
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default ContactListScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'stretch',
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
    marginTop: 15,
    backgroundColor: '#eee',
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