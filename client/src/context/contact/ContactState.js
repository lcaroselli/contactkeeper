import React, { useReducer } from 'react';
// import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
// import {
//   GET_CONTACTS,
//   ADD_CONTACT,
//   DELETE_CONTACT,
//   SET_CURRENT, d
//   CLEAR_CURRENT,
//   UPDATE_CONTACT,
//   FILTER_CONTACTS,
//   CLEAR_CONTACTS,
//   CLEAR_FILTER,
//   CONTACT_ERROR,
// } from '../types';

const ContactState = props => {
    const initialState = {
      contacts: null,
      current: null,
      filtered: null,
      error: null
    };
  
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get all contacts

    // Add a contact

    // Delete a contatc

    // Update a contatc info

    // Clear contacts

    // Filter contacts

    // Clear filter

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
  
