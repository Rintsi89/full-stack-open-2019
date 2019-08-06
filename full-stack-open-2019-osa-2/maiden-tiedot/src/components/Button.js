import React from 'react'

const Button = ({ country, handleClick}) =>
    <button onClick={() => handleClick(country.name)}>Show</button>

export default Button