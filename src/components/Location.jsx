import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
const Location = ({tab, google, selectedPlace}) => {
  const [location, setLocation] = useState({lat: 0, lng: 0});

  const onMapClick = (mapProps, map, clickEvent) =>{
    if (clickEvent.latLng){
      const lat = clickEvent.latLng.lat();
      const lng = clickEvent.latLng.lng();
      console.log(clickEvent)
      setLocation({lat, lng})
    }
  }

  return (
    <div className={tab === 'location' ? '' : 'is-hidden'}>
      <h1 className="title is-3">Click on the map to set the coordinates</h1>
      <h2 className="title is-4">Latitude: {location.lat}</h2>
      <h2 className="title is-4">Longitude: {location.lng}</h2>
      <Map google={google} zoom={10}  onClick={onMapClick}>
        <Marker name={'target'} position={location}/>
      </Map>
    </div>
  );
}

const mapStateToProps = state => ({
  tab: state.tab
});


export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: ('AIzaSyCaRxFkZP2rG7BsxZmIzraIhooR-3aqf20')
})(Location))