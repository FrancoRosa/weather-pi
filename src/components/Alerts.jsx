import { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from 'react-redux';

const GPIOEmulator = ({ headline }) => {
  // warning, watch, advisory
  // warning: show what the warning is.. and output to a GPIO
  // watch: show what the watch is.. .and output to a GPIO
  // advisory: show what the advisory is... No output to GPIO
  // keywords: Tornado, Severe Thunderstorm
  const warning = headline => {
    if (headline) return headline.toLowerCase().includes('warning');
    return false;
  }
  const watch = headline => {
    if (headline) return headline.toLowerCase().includes('watch'); 
    return false;
  }

  return (
    <div>
      <h3>GPIO OUTPUT</h3>
      <h4>{headline}</h4>
      <table>
        <tr><th>Warning</th><td>{warning(headline) ? 'ON' : 'OFF'}</td></tr>
        <tr><th>Watch</th><td>{watch(headline) ? 'ON' : 'OFF'}</td></tr>
      </table>
    </div>
  )
}

const Alerts = ({ tab, fullLocation }) => {
  const intervalAlert = 1; // minutes 
  const [alarmUpdate, setAlarmUpdate] = useState('');
  const [alarmDetails, setAlarmDetails] = useState([]);
  
  const getAlerts = () =>{
    if (fullLocation.county){
      console.log('... getAlerts');
      const urlAlert = `https://api.weather.gov/alerts/active/zone/${fullLocation.county}`;
      axios.get(urlAlert, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        console.log(res.data)
        const alarmClock = new Date(res.data.updated).toString()
        setAlarmUpdate(alarmClock);
        setAlarmDetails(res.data.features);
      });
    }
  }

  useEffect(() => {
    getAlerts();
    setInterval(getAlerts, intervalAlert*1000*60)
  }, [])

  return (
    <div className={tab === 'alert' ? '' : 'is-hidden'}>
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
      <GPIOEmulator headline={alarmDetails.length>0 ? alarmDetails[0].properties.headline : ''} />
      <h3>Last Alarm Update:</h3>
      <p>{alarmUpdate}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  tab: state.tab,
  fullLocation: state.fullLocation
})

export default connect(mapStateToProps)(Alerts)
