import React from 'react'

const Filter = ({ handleSearch }) =>
    <div>Find countries: <input onChange={handleSearch} /></div>

export default Filter