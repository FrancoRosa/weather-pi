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

  // time related
  const [forecastUpdate, setForecastUpdate] = useState('');
  const [currentUpdate, setCurrentUpdate] = useState('');
  const [alarmUpdate, setAlarmUpdate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  // values related
  const [forecastPeriods, setForecastPeriods] = useState([]);
  const [currentValues, setCurrentValues] = useState({});
  const [alarmDetails, setAlarmDetails] = useState([]);

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
      setCurrentValues(res.data.current);
      const currentClock = Date(currentValues.dt)
      setCurrentUpdate(currentClock);
    });
  }

  const getAlerts = () =>{
    console.log('... getAlerts');
    axios.get(urlAlert, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => {
      console.log(res.data)
      setAlarmUpdate(res.data.updated);
      setAlarmDetails(res.data.features);
    });
  }

  const getTime = () => {
    const now = new Date().toString();
    setCurrentTime(now);
  }

  useEffect(()=>{
    // getForecastUrl();
    // setInterval(getForecast, interval*1000*60);
    // setInterval(getCurrentValues, interval*1000*60)
    // setInterval(getTime, 1000)
    
    getAlerts();
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
      
      <h2>Alert:</h2>
      <table>
        <tbody>
            <tr><th>Category:</th><td>{alarmDetails.length>0 ? alarmDetails[0].properties.category : ''}</td></tr>
            <tr><th>Severity:</th><td>{alarmDetails.length>0 ? alarmDetails[0].properties.severity : ''}</td></tr>
            <tr><th>Certainty:</th><td>{alarmDetails.length>0 ? alarmDetails[0].properties.certainty : ''}</td></tr>
            <tr><th>Urgency:</th><td>{alarmDetails.length>0 ? alarmDetails[0].properties.urgency : ''}</td></tr>
            <tr><th>Event:</th><td>{alarmDetails.length>0 ? alarmDetails[0].properties.description : ''}</td></tr>
            <tr><th>Headline:</th><td>{alarmDetails.length>0 ? alarmDetails[0].properties.headline : ''}</td></tr>
            <tr><th>Description:</th><td>{alarmDetails.length>0 ? alarmDetails[0].properties.description : ''}</td></tr>
            <tr><th>Instruction:</th><td>{alarmDetails.length>0 ? alarmDetails[0].properties.instruction : ''}</td></tr>
            <tr><th>NWSheadline:</th><td>{alarmDetails.length>0 ? alarmDetails[0].properties.parameters.NWSheadline : ''}</td></tr>
        </tbody>
      </table>
      <h3>Last Alarm Update:</h3>
      <p>{forecastUpdate}</p>
      <h3>Now:</h3>
      <p>{currentTime}</p>
    </div>
  );
}

export default CurrentConditions;
