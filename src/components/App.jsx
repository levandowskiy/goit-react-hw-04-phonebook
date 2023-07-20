import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (localStorage.length !== 0) {
      setContacts(JSON.parse(localStorage.getItem('contacts')))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const addContact = (name, number) => {
    const newContact = { id: nanoid(), name, number };

    setContacts([...contacts, newContact])
  };

  const handleFilterChange = event => {
    setFilter(event.target.value)
  };

  const handlerDelete = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);

    setContacts(updatedContacts)
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        handlerDelete={handlerDelete}
      />
    </>
  );
}

