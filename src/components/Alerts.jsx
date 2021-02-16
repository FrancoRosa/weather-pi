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

const Alerts = ({ tab, fullLocation }) => {
  const intervalAlert = 5; // minutes 
  const [alarmUpdate, setAlarmUpdate] = useState('');
  const [alarmDetails, setAlarmDetails] = useState([
      {
        properties: {
          headline: ''
        }
      }
    ],
  );
  const [alarmTitle, setAlarmTitle] = useState('  ');
  
  const eraseAlertValues = () => {
    setAlarmUpdate('');
    setAlarmDetails([
        {
          properties: {
            headline: ''
          }
        }
      ],
    );
    setAlarmTitle('  ');
  }

  const getAlerts = () => {
    if (fullLocation.countyCode){
      const urlAlert = `https://api.weather.gov/alerts/active/zone/${fullLocation.countyCode}`;
      axios.get(urlAlert, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then(res => {
        console.log('>> getAlerts:');
        console.log(res.data)
        const alarmClock = new Date(res.data.updated).toString()
        setAlarmUpdate(alarmClock);
        setAlarmDetails(res.data.features);
        setAlarmTitle(res.data.title);
      });
    }
  }

  useEffect(() => {
    getAlerts();
    setInterval(getAlerts, intervalAlert*1000*60)
  }, []);

  useEffect(() => {
    getAlerts();
    eraseAlertValues();
  }, [fullLocation])

  return (
    <div className={tab === 'alert' ? '' : 'is-hidden'}>
      <h1 className="title is-3 has-text-link has-text-centered">{`${alarmTitle[0].toUpperCase()}${alarmTitle.slice(1)}`}</h1>
      {alarmDetails.map(alarm => (
        <div>
          <h1 
            className={`title has-text-centered ${warning(alarm.properties.headline) ? 'has-text-danger' : ''} ${watch(alarm.properties.headline) ? 'has-text-warning' : ''}`}>
            {alarm.properties.headline}
          </h1>
        </div>
      ))}
      <nav class="level">
        <LocationValue heading='Last update' value={alarmUpdate.split('(')[0]} />
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({
  tab: state.tab,
  fullLocation: state.fullLocation
})

export default connect(mapStateToProps)(Alerts)
