import { combineReducers, createStore } from 'redux';
import tab from './tab';
import fullLocation from './fullLocation';

const rootReducer = combineReducers({
  tab,
  fullLocation,
});

const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;