import React, { useState, useEffect } from 'react';
import axios from 'axios';
const api_key = import.meta.env.VITE_WEATHER_API_KEY;



function Country({data: {name, capital, population, flags, languages}}) {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital.toString()}&appid=${api_key}&units=imperial`
      )
      .then((response) => {
        setWeather(response.data);
      });
    return () => setWeather({});
  }, [capital]);

  return (
    <>
      <h1>{name["common"]}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {Object.keys(languages).map((key, i) => (
          <li key={i}>{languages[key]}</li>
        ))}
      </ul>
      <img src={flags["png"]} alt={name["common"]} width="100px" />
      {Object.keys(weather).length !== 0 && (
        <>
          <h2>Weather in {capital}</h2>
          <p>
            <strong>temperature:</strong> {weather.main["temp"]} Fahrenheit
          </p>
          <img
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>
            <strong>wind:</strong> {weather.wind["speed"]} mph direction{" "}
            {weather.wind["deg"]} degrees
          </p>
        </>
      )}
    </>
  );
}

function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState([]);
  const [showCountry, setShowCountry] = useState({});

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    setShowCountry(countriesFilter.length === 1 ? {...countriesFilter[0]} : {});
  }, [countriesFilter]);

  const searchCountry = (e) => {
    setCountry(e.target.value);
    setCountriesFilter(
      countries.filter(
        (country) =>
          country.name.common.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      )
    );
  };
  const showCountries = () => {
    return countriesFilter.map((country, i) => (
      <p key={i}>
        {country.name["common"]}
        <button onClick={() => setShowCountry(country)}>show</button>
      </p>
    ));
  };

  return (
    <>
      <p>
        find countries <input value={country} onChange={searchCountry} />
      </p>
      {countriesFilter.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        showCountries()
      )}
      {showCountry.name && <Country data={showCountry} />}
    </>
  );
}

export default App;

