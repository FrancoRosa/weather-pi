import { useEffect, useState } from "react";
import { setFullLocation } from "../actions";
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

const Location = ({tab, google, selectedPlace, setFullLocation, fullLocation}) => {
  const [location, setLocation] = useState({lat: 0, lng: 0});
  const api_key = 'AIzaSyC-CH2v8wUZ-hnpkgdUgdr2iEOVj1os0rs';
  
  const getLocationName = () => {
    const geodecodingURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${api_key}`
    axios.get(geodecodingURL)
      .then(res => {
        console.log(res.data)
      })
  } 
  
  const onMapClick = (mapProps, map, clickEvent) =>{
    if (clickEvent.latLng){
      const lat = clickEvent.latLng.lat().toFixed(5);
      const lng = clickEvent.latLng.lng().toFixed(5);
      console.log(clickEvent)
      setLocation({lat, lng})
      getLocationName();
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
        <LocationValue heading='lalitude' value={location.lat} />
        <LocationValue heading='longitude' value={location.lng} />
        <LocationValue heading='state' value='XX' />
        <LocationValue heading='county' value='ZZZ' />
      </nav>
      <h1 className="title is-7 has-text-success has-text-centered heading">Click on the map to set the coordinates</h1>
      <Map google={google} zoom={10} onClick={onMapClick} containerStyle={containerStyle}>
        <Marker name={'target'} position={location}/>
      </Map>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setFullLocation: fullLocation => dispatch(setFullLocation(fullLocation))
})

const mapStateToProps = state => ({
  tab: state.tab,
  fullLocation: state.fullLocation,
});


export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: ('AIzaSyCaRxFkZP2rG7BsxZmIzraIhooR-3aqf20')
})(Location))