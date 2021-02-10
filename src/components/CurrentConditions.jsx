import { useEffect, useState } from "react";
import axios from 'axios';

const CurrentConditions = () => {
  const interval = 2; // minutes 
  const latitude = 39.7456;
  const longitude = -97.0892;
  const state = 'KS';
  const urlPoint = `https://api.weather.gov/points/${latitude},${longitude}`;
  const urlAlert = `https://api.weather.gov/alerts/active?area=${state}`;
  let urlForecast = '';
  const openWeatherKey = '37fe7dced1adaf904d0ca7f5e66ff95b'
  const urlOpenWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily,hourly,minutely&appid=${openWeatherKey}&units=imperial`;

  const [forecastUpdate, setForecastUpdate] = useState('');
  const [forecastPeriods, setForecastPeriods] = useState([]);
  const [currentValues, setCurrentValues] = useState({});
  const [currentUpdate, setCurrentUpdate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

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
        const forecastTime = new Date(res.data.properties.updated).toString();
        setForecastUpdate(forecastTime);
        setForecastPeriods(res.data.properties.periods);
      });
    } else {
      getForecastUrl();
    }
  }

  const getCurrentValues = () =>{
    console.log('... getCurrentValues');
    axios.get(urlOpenWeather, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => {
      console.log(res.data.current)
      setCurrentValues(res.data.current);
      const currentClock = Date(currentValues.dt)
      setCurrentUpdate(currentClock);
    });
  }

  const getTime = () => {
    const now = new Date().toString();
    setCurrentTime(now);
  }

  useEffect(()=>{
    getForecastUrl();
    setInterval(getForecast, interval*1000*60);
    setInterval(getCurrentValues, interval*1000*60)
    setInterval(getTime, 1000)
    
    getCurrentValues();
  },[]);

  return (
    <div className="weather__container">
      <h2>Current Conditions:</h2>
      <table className="weather__table">
        <tbody>
          <tr><th>Temperature:</th><td>{currentValues.temp} ºF</td></tr>
          <tr><th>Condition:</th><td>{currentValues.weather ? currentValues.weather[0].main : '0'}</td></tr>
          <tr><th>Humidity:</th><td>{currentValues.humidity} %</td></tr>
          <tr><th>WindSpeed:</th><td>{currentValues.wind_speed} miles/hour</td></tr>
          <tr><th>Barometer:</th><td>{currentValues.pressure} hPa</td></tr>
          <tr><th>Dewpoint:</th><td>{currentValues.dew_point}</td></tr>
          <tr><th>Visibility:</th><td>{currentValues.visibility}</td></tr>
          <tr><th>UV Index:</th><td>{currentValues.uvi}</td></tr>
        </tbody>
      </table>
      <h3>Last update:</h3>
      <p>{currentUpdate}</p>

      <h2>Forecast:</h2>
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
      <p>{forecastUpdate}</p>
      <h3>Now:</h3>
      <p>{currentTime}</p>
    </div>
  );
}

export default CurrentConditions;
