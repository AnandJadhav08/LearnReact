import React, { createContext, useState, useContext } from 'react'

export type Contact = {
  name: string
  phone: string
  email?: string
  workplace?: string
}

type ContactContextType = {
  contacts: Contact[]
  addContact: (contact: Contact) => void
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([])

  const addContact = (contact: Contact) => {
    setContacts(prev => [...prev, contact])
  }

  return (
    <ContactContext.Provider value={{ contacts, addContact }}>
      {children}
    </ContactContext.Provider>
  )
}

export const useContacts = () => {
  const context = useContext(ContactContext)
  if (!context) throw new Error('useContacts must be used within ContactProvider')
  return context
}