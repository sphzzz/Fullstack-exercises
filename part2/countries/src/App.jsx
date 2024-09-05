import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [searchIndex, setSearchIndex] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); 

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
    setSelectedCountry(null); 

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    );
    
    setFilteredCountries(filtered);
  };

  const handleShowCountry = (country) => {
    console.log(`Showing details for: ${country.name.common}`); 
    setSelectedCountry(country);
  };

  const renderCountryDetails = (country) => {
    const languages = Object.values(country.languages);
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Area:</strong> {country.area} km²</p>
        <p><strong>Languages:</strong></p>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="150" />
      </div>
    );
  };

  const showResult = () => {
    if (selectedCountry) {
      return renderCountryDetails(selectedCountry);
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, please be more specific.</p>;
    }
    
    if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common} 
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      );
    }

    if (filteredCountries.length === 1) {
      return renderCountryDetails(filteredCountries[0]);
    }

    return <p>No matches found.</p>;
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
