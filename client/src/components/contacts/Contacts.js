import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  // initialize context - can access any state or methods in that context
  const contactContext = useContext(ContactContext);

  const { contacts, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts.map((contact) => (
        <ContactItem contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts;
