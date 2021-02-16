import { SET_RPI_RESPONSE } from '../actions/index';

const rpi = (state = false, action) => {
  switch (action.type) {
    case SET_RPI_RESPONSE:
      return action.rpi;
    default:
      return state;
  }
}

export default rpi;