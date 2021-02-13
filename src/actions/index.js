export const SET_TAB = 'SET_TAB';
export const SET_FULL_LOCATION = 'SET_FULL_LOCATION';

export const setTab = tab => (
  {
    tab,
    type: SET_TAB,
  }
);

export const setFullLocation = fullLocation => (
  {
    fullLocation,
    type: SET_FULL_LOCATION,
  }
);