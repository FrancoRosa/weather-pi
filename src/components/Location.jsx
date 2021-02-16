import { setLocationCoordinates, setLocationData } from "../actions";
import { connect } from 'react-redux';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import LocationValue from './LocationValue';

const Location = ({tab, google, selectedPlace, setLocationCoordinates, setLocationData, fullLocation}) => {
  
  const onMapClick = (mapProps, map, clickEvent) =>{
    if (clickEvent.latLng){
      const lat = clickEvent.latLng.lat().toFixed(5);
      const lng = clickEvent.latLng.lng().toFixed(5);
      // setLocationData({urlForecast: '', countyCode: '', stateCode: ''})
      // setLocationCoordinates({lat, lng});
      // getForecastUrl(lat, lng);
      const pythonServer = 'http://localhost:9999/api/v1/'
      const payload = {lat, lng, key: 'location'}
      axios({
        method: 'POST',
        url: pythonServer,
        data: payload,
      })
      .then(res => console.log(res.data));
    }
  }

  const getForecastUrl = (lat, lng) => {
    if (lat != 0 && lng != 0 ) {
      console.log('... getForecastUrl');
      const urlPoint = `https://api.weather.gov/points/${lat},${lng}`;
      axios.get(urlPoint, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then(res => {
        console.log('>> ForecastUrl:');
        console.log(res.data);
        const urlForecast = res.data.properties.forecast;
        const urlCounty = res.data.properties.county
        const countyCode = urlCounty.split('county')[1].slice(1,7)
        const stateCode = countyCode.slice(0,2)
        setLocationData({urlForecast, countyCode, stateCode})
      })
      .catch(error => console.log(error));
    }
  }
  const containerStyle = {
    width: '100%',
    height: '50%',
    display: 'block',
    zIndex: '0',
  }

  return (
    <div className={`location-map ${tab === 'location' ? '' : 'is-hidden'}`}>
      <nav class="level">
        <LocationValue heading='lalitude' value={fullLocation.lat} />
        <LocationValue heading='longitude' value={fullLocation.lng} />
        <LocationValue heading='state' value={fullLocation.stateCode} />
        <LocationValue heading='county' value={fullLocation.countyCode} />
      </nav>
      <h1 className="title is-7 has-text-success has-text-centered heading">Click on the map to set the coordinates</h1>
      <Map google={google} zoom={4} onClick={onMapClick} containerStyle={containerStyle} initialCenter={{lat: fullLocation.lat, lng: fullLocation.lng}}>
        <Marker name={'target'} position={{lat: fullLocation.lat, lng: fullLocation.lng}}/>
      </Map>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setLocationData: data => dispatch(setLocationData(data)),
  setLocationCoordinates: coordinates => dispatch(setLocationCoordinates(coordinates))
})

const mapStateToProps = state => ({
  tab: state.tab,
  fullLocation: state.fullLocation,
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: ('AIzaSyCaRxFkZP2rG7BsxZmIzraIhooR-3aqf20')
})(Location))