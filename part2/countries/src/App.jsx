import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  
  const [searchIndex, setSearchIndex] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log('Error fetching data:', error));
  }, []);

  
  const handleCountryChange = (event) => {
    setSearchIndex(event.target.value);
    
    
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    );
    
    setFilteredCountries(filtered);
  };

  
  const showResult = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      );
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      const languages = Object.values(country.languages);

      return (
        <div>
          <h2>{country.name.common}</h2>
          <p><strong>capital:</strong> {country.capital}</p>
          <p><strong>area:</strong> {country.area} km²</p>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}<br></br>
          <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="150" />
        </div>
      );
    } else {
      return <p>No matches found.</p>;
    }
  };

  return (
    <div>
      <label>Find countries: </label>
      <input value={searchIndex} onChange={handleCountryChange} /><br />
      {showResult()}
    </div>
  );
};

export default App;
