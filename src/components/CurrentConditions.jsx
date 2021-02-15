import { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from 'react-redux';

const CurrentConditions = ({ tab, fullLocation }) => {
  const intervalCurrent = 15; // minutes to call to open weather 
  const openWeatherKey = '37fe7dced1adaf904d0ca7f5e66ff95b'
  
  const [currentUpdate, setCurrentUpdate] = useState('');
  const [currentValues, setCurrentValues] = useState({});
  
  const getCurrentValues = () =>{
    if (fullLocation.lat != 0 && fullLocation.lng != 0){
      console.log('... getCurrentValues');
      const urlOpenWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${fullLocation.lat}&lon=${fullLocation.lng}&exclude=daily,hourly,minutely&appid=${openWeatherKey}&units=imperial`;
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
  }

  useEffect(()=>{
    getCurrentValues();
    setInterval(getCurrentValues, intervalCurrent*1000*60)
  },[]);

  return (
    <div className={tab === 'now' ? '' : 'is-hidden'}>
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
    </div>
  );
}

const mapStateToProps = state => ({
  tab: state.tab,
  fullLocation: state.fullLocation
})

export default connect(mapStateToProps)(CurrentConditions)
