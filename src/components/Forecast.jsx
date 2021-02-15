import { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from "react-redux";

const Forecast = ({ tab, setFullLocation, fullLocation }) => {
  const intervalForecast = 1; // minutes to call to open weather 
  
  const [forecastUpdate, setForecastUpdate] = useState('');
  const [forecastPeriods, setForecastPeriods] = useState([]);

  const getForecast = () =>{
    if (fullLocation.urlForecast) {
      console.log('... getForecast');
      axios.get(fullLocation.urlForecast, {
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
    }
  }

  useEffect(() => {
    getForecast();
    setInterval(getForecast, intervalForecast*1000*60);
  },[])

  return (
    <div className={tab === 'forecast' ? '' : 'is-hidden'}>
      <h2>Forecast</h2>
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

const mapStateToProps = state => ({
  tab: state.tab,
  fullLocation: state.fullLocation
});

export default connect(mapStateToProps)(Forecast)