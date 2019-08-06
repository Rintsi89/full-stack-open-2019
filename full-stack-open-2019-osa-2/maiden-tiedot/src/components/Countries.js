import React from 'react'
import Country from './Country'
import CountryDetails from './CountryDetais'

const Countries = ({ filteredCountries, handleClick }) => {
    
    if(filteredCountries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if (filteredCountries.length === 1) {
        return (
            <CountryDetails country={filteredCountries[0]} />
        )
    }

    const rows = () => filteredCountries.map(filteredCountry =>
        <Country key={filteredCountry.name} country={filteredCountry} handleClick={handleClick} />)

    return (
        <div>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}
export default Countries