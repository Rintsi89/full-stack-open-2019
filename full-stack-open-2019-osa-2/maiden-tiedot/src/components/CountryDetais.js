import React, { useState, useEffect }from 'react'
import axios from "axios"

const CountryDetails = ({ country }) => {

    const [weather, setWeather] = useState({})
    const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)
    const imageStyle= {
        maxWidth: '100px',
        maxHeight: '100px'
    };
    const altText = `${country.name} flag`
    const capitalCity = country.capital

    const weatherHook = () => {
        axios
            .get(`https://api.apixu.com/v1/forecast.json?key=d3e347c086024b8796593316190108&q=${capitalCity}`)
            .then(response => {
                setWeather({
                    temparature: `${response.data.current.temp_c} Celcius`,
                    temparatureIcon: response.data.current.condition.icon,
                    wind: `${response.data.current.wind_kph} kph, direction ${response.data.current.wind_dir}`
                })
            })
    }

    useEffect(weatherHook, [])

    return (
        <div>
            <h2>{country.name}</h2>
                <p>Capital city: {country.capital}</p>
                <p>Population: {country.population}</p>
            <h3>Languages</h3>
                <ul>
                    {languages}
                </ul>
                <img src={country.flag} alt={altText} style={imageStyle}/>
            <h3>Weather in {country.capital}</h3>
                <p><strong>Temparature:</strong> {weather.temparature}</p>
                <img src={weather.temparatureIcon} alt="Weather icon" style={imageStyle} />
                <p><strong>Wind:</strong> {weather.wind}</p>     
        </div>
    )
}

export default CountryDetails