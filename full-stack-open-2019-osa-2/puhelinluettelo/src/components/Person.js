import React from 'react'

const Person = ({ name, number, id, deleteName }) => {
    return (
            <li>{name} {number} <button onClick={() => deleteName(name, id)}>Delete</button> </li>     
    )
}

export default Person