import { SET_FULL_LOCATION } from '../actions/index';

const readLocalStorage = () => {
  const savedData = localStorage.getItem('fullLocation');
  if (savedData) {
    return JSON.parse(savedData)
  } else {
    return {lat: 0, lon: 0, state: '', county: ''}
  }
}

const fullLocation = (state = readLocalStorage(), action) => {
  switch (action.type) {
    case SET_FULL_LOCATION:
      return action.fullLocation;
    default:
      return state;
  }
}

export default fullLocation;