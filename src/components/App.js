import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddContact from './AddContact';
import './App.css';
import ContactList from './ContactList';
import Header from "./Header";
import { uuid } from "uuidv4";
import ContactDetail from "./ContactDetail";
import api from "../api/contacts";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  //RetriveContacts
  const  retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts",request);
    setContacts([...contacts, response.data ]);
  };

  const removeContactHandler = async (id) => {
    await api.delete('/contacts/${id}');
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts); 
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
   <div className="ui container"> 
    <Router>
     <Header/>
      <Switch>
          <Route path="/" exact render={(props) => (
            <ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />
          )}
          />
          <Route path="/add"  render={(props) => (
            <AddContact {...props} addContactHandler={addContactHandler} />
          )}
          />
          <Route path="/contact/:id" component={ContactDetail} />   
      </Switch>
     </Router>
     
   </div>
  );
}

export default App;
