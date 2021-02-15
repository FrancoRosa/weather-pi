export const SET_TAB = 'SET_TAB';
export const SET_LOCATION_DATA = 'SET_LOCATION_DATA';
export const SET_LOCATION_COORDINATES = 'SET_LOCATION_COORDINATES';

export const setTab = tab => (
  {
    tab,
    type: SET_TAB,
  }
);

export const setLocationData = data => (
  {
    data,
    type: SET_LOCATION_DATA,
  }
);

export const setLocationCoordinates = location => (
  {
    location,
    type: SET_LOCATION_COORDINATES,
  }
);