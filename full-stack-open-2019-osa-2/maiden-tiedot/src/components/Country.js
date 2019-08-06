import React from 'react'
import Button from './Button'

const Country = ({ country, handleClick }) =>
    <li>{country.name} - <Button country={country} handleClick={handleClick} /></li>
 
export default Country