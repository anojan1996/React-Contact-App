import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddContact from './AddContact';
import './App.css';
import ContactList from './ContactList';
import Header from "./Header";
import { uuid } from "uuidv4";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
   <div className="ui container"> 
    <Router>
     <Header/>
      <Switch>
          <Route exact path="/">
             <ContactList contacts={contacts} getContactId={removeContactHandler}/>
          </Route>
          <Route path="/add">
             <AddContact addContactHandler={addContactHandler}/>
          </Route>
       
       
      </Switch>
     </Router>
     
   </div>
  );
}

export default App;
