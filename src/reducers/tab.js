import { SET_TAB } from '../actions/index';

const tab = (state = 'now', action) => {
  switch (action.type) {
    case SET_TAB:
      return action.tab;
    default:
      return state;
  }
}

export default tab;