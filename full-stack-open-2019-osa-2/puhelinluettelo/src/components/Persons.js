import React from 'react'
import Person from './Person'

const Persons = ( { filteredPersons, deleteName }) => {
    
    const rows = () => filteredPersons.map(filteredPerson => 
        <Person name={filteredPerson.name}
        number={filteredPerson.number}
        id={filteredPerson.id}
        deleteName={deleteName}
        key={filteredPerson.id} />)

    return (
        <div>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}
export default Persons