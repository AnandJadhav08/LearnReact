import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, TextInput, Button, ScrollView, StyleSheet,View, Text, TouchableOpacity } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContacts } from '../../context/ContactContext'

export type RootStackParamList = {
  AddContactScreen: undefined
  Home: undefined
  ContactList: undefined
}

type AddContactScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddContactScreen'>

const AddContactScreen: React.FC = () => {
  const navigation = useNavigation<AddContactScreenNavigationProp>()
  const { addContact } = useContacts()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [workplace, setWorkplace] = useState('')

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Missing Info', 'Please enter both name and phone number.')
      return
    }

    const newContact = { name, phone, email, workplace }
    addContact(newContact)
    Alert.alert('Contact Saved', `${name}\n${phone}\n${email || 'No email'}`)
    setName(''); setPhone(''); setEmail(''); 
    navigation.navigate('ContactList')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Contact</Text>

      <Text style={styles.label}>Name *</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter full name"
        style={styles.input}
      />

      <Text style={styles.label}>Phone *</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email (optional)"
        keyboardType="email-address"
        style={styles.input}
      />

      <Text style={styles.label}>Workplace</Text>
      <TextInput
        value={workplace}
        onChangeText={setWorkplace}
        placeholder="Enter Workplace (optional)"
        style={styles.input}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Save Contact</Text>
      </TouchableOpacity>

      <View style={styles.cancelButton}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  )
}
export default AddContactScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#5C1A1B',
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 8,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 16,
  },
})
