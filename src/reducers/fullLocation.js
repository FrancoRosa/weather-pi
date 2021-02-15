import { SET_LOCATION_COORDINATES, SET_LOCATION_DATA } from '../actions/index';

const readLocalStorage = () => {
  const savedData = localStorage.getItem('fullLocation');
  if (savedData) {
    return JSON.parse(savedData)
  } else {
    return {lat: 0, lng: 0, state: '', county: '', urlForecast:'', urlAlert: ''}
  }
}

const saveLocalStorage = fullLocation => {
  localStorage.setItem('fullLocation', JSON.stringify(fullLocation));
}

const fullLocation = (state = readLocalStorage(), action) => {
  switch (action.type) {
    case SET_LOCATION_COORDINATES:
      const { lat, lng } = action.location;
      const tempLocation = {...state, lat, lng};
      saveLocalStorage(tempLocation);
      return tempLocation;
    
    case SET_LOCATION_DATA:
      const { urlForecast, countyCode, stateCode } = action.data;
      const tempData = { ...state, urlForecast, countyCode, stateCode };
      saveLocalStorage(tempData);
      return tempData;
    
    default:
      return state;
  }
}

export default fullLocation;