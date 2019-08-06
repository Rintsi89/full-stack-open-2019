import React from 'react'

const PersonForm = ( { addName, handleNameChange, handleNumberChange, newName, newNumber}) => 
    <div>
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </div>

export default PersonForm