import Filter from'./Filter.jsx'
import PersonForm from './Personform.jsx'
import Persons from'./Persons.jsx'
import Person from './Person.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')  // Fetching the initial data from the server
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error("There was an error adding the person!", error)
        })
    }
  }

  const personsToShow = searchTerm
    ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
