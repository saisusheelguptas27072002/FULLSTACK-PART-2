import React, { useState, useEffect } from 'react';
import axios from 'axios';





const CounDetails = ({coun}) => {
  return (
      <>
          <h1>{coun.name}</h1>
          <p>Capital: {coun.capital}</p>
          <p>Population: {coun.population}</p>
          <h2>Languages</h2>
          <ul>
              {
                  coun.languages.map(language => <li key={language.name}>{language.name}</li>)
              }
          </ul>
          <img src={coun.flag} alt='Flag' style={{width: 150, height: 150}} />
          <Weather coun={coun} />
      </>
  );
};








const CounList = ({coun, countries, setCoun}) => {

  
  const searchResult = countries.filter(item => item.name.toLowerCase().includes(coun.toLowerCase()));

  return (
      <div>
          {
              searchResult.length > 10 ?
              <p>Too many matches, specify another filter.</p>
              :
              searchResult.length === 1 ?
              <CounDetails coun={searchResult[0]} />
              :
              <ul style={{listStyle: 'none', padding: 0}}>
                  {
                      searchResult.map(result => (
                          <li key={result.name}>
                              {result.name} <button onClick={() => setCoun(result.name)}>Show</button>
                          </li>
                      ))
                  }
              </ul>
          }
      </div>
  );
};








const FindCoun = ({coun, setCoun}) => {
  return (
      <div>
          <label htmlFor='find-coun'>Find countries: </label>
          <input id='find-coun' value={coun} autoFocus autoComplete='off'
              onChange={event => setCoun(event.target.value)}
          />
      </div>
  );
};





const Weather = ({coun}) => {
  const [data, setData] = useState(null);

  
  useEffect(() => {
      const params = {
          access_key: process.env.REACT_APP_API_KEY,
          query: coun.capital
      };

      axios
          .get('http://api.weatherstack.com/current', {params})
          .then(response => setData(response.data.current));
  }, [coun]);

  return (
      <div>
      <h2>Weather in {coun.capital}</h2>
          {
              data ?
              <>
                  <p><strong>Temperature:</strong> {data.temperature} celcius</p>
                  <img src={data.weather_icons[0]} alt='Weather icon' />
                  <p><strong>Wind:</strong> {data.wind_speed} mph, direction {data.wind_dir}</p>
              </>
              :
              <p>Loading weather data...</p>
          }
      </div>
  );
};





const App = () => {
  
  const [countries, setCountries] = useState([]);

  
  const [coun, setCoun] = useState('');

  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  return (
    <div>
      {
        countries.length ?
        <>
          <FindCoun coun={coun} setCoun={setCoun} />
          { coun && <CounList coun={coun} countries={countries} setCoun={setCoun} /> }
        </>
        :
        <p>Loading application...</p>
      }
    </div>
  );
};

export default App;