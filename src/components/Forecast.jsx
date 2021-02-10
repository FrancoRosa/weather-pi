import { useEffect, useState } from "react";
import axios from 'axios';
import location from '../config.json'

const Forecast = () => {
  const intervalForecast = 15; // minutes to call to open weather 
  const latitude = location.latitude;
  const longitude = location.longitude;
  const urlPoint = `https://api.weather.gov/points/${latitude},${longitude}`;
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
        const forecastTime = new Date(res.data.properties.updated).toString();
        setForecastUpdate(forecastTime);
        setForecastPeriods(res.data.properties.periods.splice(0,4));
      });
    } else {
      getForecastUrl();
    }
  }

  useEffect(() => {
    getForecastUrl();
    setInterval(getForecast, intervalForecast*1000*60);
  },[])

  return (
    <div className="weather__container">
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
    </div>
  );
}

export default Forecast