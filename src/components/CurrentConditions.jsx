import { useEffect, useState } from "react";
import axios from 'axios';

const CurrentConditions = () => {
  const interval = 2; // minutes 
  const host = 'localhost';
  const mail = 'km115.franco@gmail.com';
  const latitude = 39.7456;
  const longitude = -97.0892;
  const state = 'KS';
  const urlPoint = `https://api.weather.gov/points/${latitude},${longitude}`;
  const urlAlert = `https://api.weather.gov/alerts/active?area=${state}`;
  let urlForecast = '';

  const [forecastUpdate, setForecastUpdate] = useState('');
  const [forecastPeriods, setForecastPeriods] = useState([]);

  const getForecastUrl = () =>{
    console.log('... getForecastUrl');
    axios.get(urlPoint, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => {
      urlForecast = res.data.properties.forecast;
      getForecast();
    });
  }

  const getForecast = () =>{
    if (urlForecast) {
      console.log('... getForecast');
      axios.get(urlForecast, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        setForecastUpdate(res.data.properties.updated)
        setForecastPeriods(res.data.properties.periods)
        console.log('....periods')
        console.log(forecastPeriods)
        console.log('....test')
        if (forecastPeriods.length > 0) {
          console.log(forecastPeriods[0].name)
          console.log(forecastPeriods[0].detailedForecast)
        }
      });
    } else {
      getForecastUrl();
    }
  }

  useEffect(()=>{
    getForecastUrl();
    setInterval(getForecast, interval*1000*60);
  },[]);

  return (
    <div className="weather__container">
      <h1>Current Conditions:</h1>
      <table className="weather__table">
        <tbody>
          <tr><th>Temperature:</th><td>8F</td></tr>
          <tr><th>Condition:</th><td>Sunny</td></tr>
          <tr><th>Humidity:</th><td>48%</td></tr>
          <tr><th>WindSpeed:</th><td>48%</td></tr>
          <tr><th>Barometer:</th><td>48%</td></tr>
          <tr><th>Dewpoint:</th><td>48%</td></tr>
          <tr><th>Visibility:</th><td>48%</td></tr>
          <tr><th>WindChill:</th><td>48%</td></tr>
        </tbody>
      </table>
      <h3>Forecast:</h3>
      <table>
        <tbody>
          {forecastPeriods.map(forecast =>
            <tr>
              <th>{forecast.name}</th>
              <td>{forecast.detailedForecast}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Last forecast Update:</h3>
      <p>{Date(forecastUpdate)}</p>
    </div>
  );
}

export default CurrentConditions;
