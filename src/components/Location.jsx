import { setLocationCoordinates, setLocationData } from "../actions";
import { connect } from "react-redux";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from "axios";

const LocationValue = ({ heading, value }) => (
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">{heading}</p>
      <p class="title">{value}</p>
    </div>
  </div>
)

const Location = ({tab, google, selectedPlace, setLocationCoordinates, setLocationData, fullLocation}) => {
  
  const onMapClick = (mapProps, map, clickEvent) =>{
    if (clickEvent.latLng){
      const lat = clickEvent.latLng.lat().toFixed(5);
      const lng = clickEvent.latLng.lng().toFixed(5);
      const temp = { ...fullLocation }
      setLocationCoordinates({lat, lng})
      getForecastUrl()
    }
  }

  const getForecastUrl = () => {
    if (fullLocation.lat != 0 && fullLocation.lng !=0 ) {
      const urlPoint = `https://api.weather.gov/points/${fullLocation.lat},${fullLocation.lng}`;
      console.log('... getForecastUrl');
      axios.get(urlPoint, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        const urlForecast = res.data.properties.forecast;
        const urlCounty = res.data.properties.county
        const countyCode = urlCounty.split('county')[1].slice(1,7)
        const stateCode = countyCode.slice(0,2)
        const temp = {...fullLocation}
        setLocationData({urlForecast, countyCode, stateCode})
      });
    }
  }
  const containerStyle = {
    width: '100%',
    height: '50%',
    display: 'block',
  }

  return (
    <div className={tab === 'location' ? '' : 'is-hidden'}>
      <nav class="level">
        <LocationValue heading='lalitude' value={fullLocation.lat} />
        <LocationValue heading='longitude' value={fullLocation.lng} />
        <LocationValue heading='state' value={fullLocation.stateCode} />
        <LocationValue heading='county' value={fullLocation.countyCode} />
      </nav>
      <h1 className="title is-7 has-text-success has-text-centered heading">Click on the map to set the coordinates</h1>
      <Map google={google} zoom={10} onClick={onMapClick} containerStyle={containerStyle}>
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