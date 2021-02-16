import { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import LocationValue from './LocationValue';
import { sendDataToRpi } from '../flask_server';
import { setRpiResponse } from "../actions";


const Forecast = ({ tab, setFullLocation, fullLocation, setRpiResponse }) => {
  const intervalForecast = 5; // minutes to call to open weather 
  
  const [forecastUpdate, setForecastUpdate] = useState('');
  const [forecastPeriods, setForecastPeriods] = useState([]);
  const [forecastLocation, setForecastLocation] = useState([0,0]);

  const getForecast = () =>{
    if (fullLocation.urlForecast) {
      axios.get(fullLocation.urlForecast, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/ld+json',
        }
      })
      .then(res => {
        console.log('>> getForecast:');
        console.log(res.data);
        if (res.data) {
          sendDataToRpi(res.data, 'forecast').then(data => setRpiResponse(data))
          const forecastTime = new Date(res.data.updated).toString();
          setForecastUpdate(forecastTime);
          setForecastPeriods(res.data.periods);
        }
    });
    }
  }

  useEffect(() => {
    getForecast();
    setInterval(getForecast, intervalForecast*1000*60);
  },[])

  useEffect(() => {
    getForecast();
  },[fullLocation])

  return (
    <div className={tab === 'forecast' ? '' : 'is-hidden'}>
      {forecastPeriods.map(period => (
        <nav class="level" key={forecastPeriods.indexOf(period)}>
          <LocationValue heading={period.name} value={period.shortForecast} />
        </nav>
      ))}
      <nav class="level">
        <LocationValue heading='Last update' value={forecastUpdate.split('(')[0]} />
      </nav>
      <nav class="level">
        <LocationValue heading='Latitude' value={forecastLocation[0]} />
        <LocationValue heading='Longitude' value={forecastLocation[1]} />
      </nav>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setRpiResponse: rpi => dispatch(setRpiResponse(rpi))
})

const mapStateToProps = state => ({
  tab: state.tab,
  fullLocation: state.fullLocation
});

export default connect(mapStateToProps, mapDispatchToProps)(Forecast)