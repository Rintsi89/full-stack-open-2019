import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries';

import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase() === "" ? null : event.target.value.toLowerCase()
    const filteredArray = countries.filter(country => country.name.toLowerCase().includes(searchTerm))
    setFilteredCountries(filteredArray)
  }
  
  const handleClick = (searchTerm) => {
    const filteredArray = countries.filter(country => country.name.includes(searchTerm))
    setFilteredCountries(filteredArray)
  }

  return (
    <div>
      <Filter handleSearch={handleSearch} />
      <Countries filteredCountries={filteredCountries} handleClick={handleClick} />
    </div>
  )
}

export default App
