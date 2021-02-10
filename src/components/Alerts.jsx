import { useEffect, useState } from "react";
import axios from 'axios';
import location from '../config.json'

const Alerts = () => {
  const intervalAlert = 5; // minutes 
  const state = location.state;
  const urlAlert = `https://api.weather.gov/alerts/active?area=${state}`;
  const [alarmUpdate, setAlarmUpdate] = useState('');
  const [alarmDetails, setAlarmDetails] = useState([]);
  
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
      const alarmClock = new Date(res.data.updated).toString()
      setAlarmUpdate(alarmClock);
      setAlarmDetails(res.data.features);
    });
  }

  useEffect(() => {
    getAlerts();
    setInterval(getAlerts, intervalAlert*1000*60)
  }, [])

  return (
    <div className="weather__container">
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
      <p>{alarmUpdate}</p>
    </div>
  );
};

export default Alerts;