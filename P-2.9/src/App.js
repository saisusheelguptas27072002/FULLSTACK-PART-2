import React, { useState, useRef, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import Persons from './components/Persons';
import './index.css';




const PersonForm = ({newNa, setNewNa, newNum, setNewNum, addPer, focusNa}) => {
    return (
        <form onSubmit={addPer}>
            <div>
                Name: <input value={newNa} onChange={event => setNewNa(event.target.value)} 
                    required autoComplete='off' ref={focusNa}
                />
            </div>
            <div>
                Number: <input value={newNum} onChange={event => setNewNum(event.target.value)} 
                    required autoComplete='off'
                />
            </div>
            <div>
                <button type="submit">save</button>
            </div>
        </form>
    );
};











const Notification = ({message, type, setMessage, setType}) => {

    
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
                setType('');
            }, 5000);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line
    }, [message]);

    return (
        message ?
        <div className={type}>
            {message}
        </div>
        :
        null
    );
};




const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newNa, setNewNa ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ searchName, setSearchName ] = useState('');
  
  
  const [ message, setMessage ] = useState(null);
  const [ type, setType ] = useState('');

  const focusNa = useRef();

  
  const clearInput = () => {
    setNewNa('');
    setNewNum('');
    focusNa.current.focus();    
  };

  
  useEffect(() => {
    personService.getAll()
    .then(setPersons);
  }, []);

  
  const addPer = event => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newNa);

    
    if (existingPerson) {
      window.confirm(`${newNa} is already added to phonebook, replace the old number with a new one?`) &&
      personService.update(existingPerson.id, {number: newNum})
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
        
        
        setMessage(`Updated ${newNa}'s number`);
        setType('info');

        clearInput();
      })
      .catch(error => {
        
        if (error.name === 'TypeError') {
          setMessage(`Information of ${newNa} has already been deleted`);
          setPersons(persons.filter(person => person.id !== existingPerson.id));
        } else {
          setMessage(error.response.data.error);
        }

        setType('error');
      });
    } else {
      personService.create(newNa, newNum)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));

        
        setMessage(`Added ${newNa}`);
        setType('info');

        clearInput();
      })
      .catch(error => {
        setMessage(error.response.data.error);
        setType('error');
      });
    }
  };

  
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setMessage(`Deleted ${name}`);
        setType('info');
      });
    } 
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} setMessage={setMessage} setType={setType} />
      <Filter searchName={searchName} setSearchName={setSearchName} />

      <h3>Add a new</h3>
      <PersonForm newNa={newNa} setNewNa={setNewNa} newNum={newNum} setNewNum={setNewNum}
        addPer={addPer} focusNa={focusNa}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} searchName={searchName} deletePerson={deletePerson} />
    </div>
  );
};

export default App;