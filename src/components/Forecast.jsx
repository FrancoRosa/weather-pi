import { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import LocationValue from './LocationValue';


const Forecast = ({ tab, setFullLocation, fullLocation }) => {
  const intervalForecast = 5; // minutes to call to open weather 
  
  const [forecastUpdate, setForecastUpdate] = useState('');
  const [forecastPeriods, setForecastPeriods] = useState([]);
  const [forecastLocation, setForecastLocation] = useState([0,0]);

  const getForecast = () =>{
    if (fullLocation.urlForecast) {
      axios.get(fullLocation.urlForecast, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        console.log('>> getForecast:');
        console.log(res.data);
        const forecastTime = new Date(res.data.properties.updated).toString();
        setForecastUpdate(forecastTime);
        setForecastPeriods(res.data.properties.periods);
        setForecastLocation(res.data.geometry.coordinates[0][0])
      });
    }
  }

  useEffect(() => {
    getForecast();
    setInterval(getForecast, intervalForecast*1000*60);
  },[])

  return (
    <div className={tab === 'forecast' ? '' : 'is-hidden'}>
      {forecastPeriods.map(period => (
        <nav class="level">
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

const mapStateToProps = state => ({
  tab: state.tab,
  fullLocation: state.fullLocation
});

export default connect(mapStateToProps)(Forecast)