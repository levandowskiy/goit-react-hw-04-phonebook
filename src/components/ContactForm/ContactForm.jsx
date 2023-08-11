import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "./ContactForm.styled";

const ContactForm = ({ addContact, contacts }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const inputHandler = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const isContactExists = contacts.find(
      (contact) => contact.name === name
    );

    if (isContactExists) {
      alert(`${isContactExists.name} is already in contacts`);
      return;
    }

    addContact(name, number);
    setName("");
    setNumber("");
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={inputHandler}
          value={name}
        />
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={inputHandler}
          value={number}
        />
        <button type="submit">Add contact</button>
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactForm;
