import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/personService'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])
    const [message, setMessage] = useState(null)
    const [status, setStatus] = useState(null)

    
    const hook = () => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
                setFilteredPersons(initialPersons)
            })
    }

    useEffect(hook, [])

    const addName = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {

            const samePerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

            if (samePerson.number !== newNumber) {

                if (window.confirm(`${samePerson.name} is already added to phonebook. Do you want to replace phone number?`)) {
                    const changedPerson = { ...samePerson, number: newNumber }
                    personService
                        .updateNumber(samePerson.id, changedPerson)
                        .then(returnedPerson => {
                            setPersons(persons.map(person => person.id !== samePerson.id ? person : returnedPerson))
                            setFilteredPersons(persons.map(person => person.id !== samePerson.id ? person : returnedPerson))
                            setNewName("")
                            setNewNumber("")
                            setMessage(`Updated number for ${returnedPerson.name}`)
                            setTimeout(() => {
                                setMessage(null)
                            }, 3000)
                        }).catch((e) => {                            
                            setMessage(`${samePerson.name} has been already removed from the database`)
                            setStatus("Error")
                            setNewName("")
                            setNewNumber("")
                            setTimeout(() => {
                                setMessage(null)
                                setStatus(null)
                            }, 3000)
                        })  
                }
                return
            } else {
                setNewName("")
                setNewNumber("")
                return alert(`${samePerson.name} with number ${samePerson.number} is already added to the database`)
            }
        }

        const personObject = {
            name: newName.trim(),
            number: newNumber,
            id: undefined
        }

        personService
            .create(personObject)
            .then(returnPerson => {
                setPersons(persons.concat(returnPerson))
                setFilteredPersons(persons.concat(returnPerson))
                setNewName("")
                setNewNumber("")
                setMessage(`Added ${returnPerson.name}`)
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
            })
    }

    const deleteName = (name, id) => {

        if (window.confirm(`Do you really want to remove ${name}`)) {
            personService.deletePerson(id)
                .then((id) => {
                    const updatedPersons = persons.filter(person => person.id !== id)
                    const deletedPerson = persons.find(person => person.id === id)
                    setPersons(updatedPersons)
                    setFilteredPersons(updatedPersons)
                    setMessage(`Deleted ${deletedPerson.name}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)
                }) 
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase()
        const filteredArray = persons.filter(person => person.name.toLowerCase().includes(searchTerm))
        setFilteredPersons(filteredArray)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} status={status}/>
                <Filter handleSearch={handleSearch} />
            <h2>Add new</h2>
            <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                newName={newName} newNumber={newNumber}/>
            <h2>Numbers</h2>
            <Persons filteredPersons={filteredPersons} deleteName={deleteName}/>
    </div>
    )
}

export default App