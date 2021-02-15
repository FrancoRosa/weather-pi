import { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import LocationValue from './LocationValue';

const warning = headline => {
  if (headline) return headline.toLowerCase().includes('warning');
  return false;
}
const watch = headline => {
  if (headline) return headline.toLowerCase().includes('watch'); 
  return false;
}

const CurrentConditions = ({ tab, fullLocation }) => {
  const intervalCurrent = 5; // minutes to call to open weather 
  const openWeatherKey = '37fe7dced1adaf904d0ca7f5e66ff95b'
  
  let weatherValues = {
    temp: '',
    humidity: '',
    wind_speed: '',
    pressure: '',
    pressure: '',
    dewpoint: '',
    visibility: '',
    uvi: '',
    weather: [{main: 0}]
  }

  const [currentUpdate, setCurrentUpdate] = useState('');
  const [currentValues, setCurrentValues] = useState(weatherValues);
  const [currentAlerts, setCurrentAlerts] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({lat:0, lon:0})
  
  const getCurrentValues = location =>{
    const { lat, lng } = location;
    if (lat != 0 && lng != 0){
      const urlOpenWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=daily,hourly,minutely&appid=${openWeatherKey}&units=imperial`;
      axios.get(urlOpenWeather, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        console.log('>> Current Values:')
        console.log(res.data)
        setCurrentValues(res.data.current);
        setCurrentLocation({lat: res.data.lat, lon: res.data.lon})
        setCurrentAlerts(res.data.alerts);
        const currentClock = Date(currentValues.dt)
        setCurrentUpdate(currentClock);
      });
    }
  }

  useEffect(()=>{
    getCurrentValues(fullLocation);
    setInterval(() => getCurrentValues(fullLocation), intervalCurrent*1000*60)
  },[]);

  useEffect(()=>{
    getCurrentValues(fullLocation);
  },[fullLocation]);


  return (
    <div className={tab === 'now' ? '' : 'is-hidden'}>
      <nav class="level">
        <LocationValue heading='Temperature (F)' value={currentValues.temp} />
        <LocationValue heading='Condition' value={currentValues.weather[0].main} />
        <LocationValue heading='Humidity (%)' value={currentValues.humidity} />
        <LocationValue heading='Wind Speed (mph)' value={currentValues.wind_speed} />
      </nav>
      <nav class="level">
        <LocationValue heading='Barometer (in)' value={currentValues.pressure} />
        <LocationValue heading='Dewpoint (F)' value={currentValues.dew_point} />
        <LocationValue heading='Visibility (mi)' value={currentValues.visibility} />
        <LocationValue heading='UV Index (mph)' value={currentValues.uvi} />
      </nav>
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Alert</p>
            {currentAlerts.map(alert => (
              <p class={`title ${warning(alert.event) ? 'has-text-danger' : ''} ${watch(alert.event) ? 'has-text-warning' : ''}`}>{alert.event}</p>))}
          </div>
        </div>
      </nav>

      <nav class="level">
        <LocationValue heading='Last update' value={currentUpdate.split('(')[0]} />
      </nav>
      <nav class="level">
        <LocationValue heading='Latitude' value={currentLocation.lat} />
        <LocationValue heading='Longitude' value={currentLocation.lon} />
      </nav>
    </div>
  );
}

const mapStateToProps = state => ({
  tab: state.tab,
  fullLocation: state.fullLocation
})

export default connect(mapStateToProps)(CurrentConditions)
