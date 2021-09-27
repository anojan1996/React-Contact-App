import AddContact from './AddContact';
import './App.css';
import ContactList from './ContactList';
import Header from "./Header";

function App() {
  const contacts = [
    {
      id:"1",
      name:"Anojan",
      email:"anojan2012@gmail.com" ,
    },
    {
      id:"2",
      name:"React",
      email:"react2012@gmail.com" ,
    },
  ];
  return (
   <div className="ui container"> 
     <Header/>
     <AddContact/>
     <ContactList contacts={contacts}/>
   </div>
  );
}

export default App;
