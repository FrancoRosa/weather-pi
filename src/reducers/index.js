import { combineReducers, createStore } from 'redux';
import tab from './tab';

const rootReducer = combineReducers({
  tab,
});

const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;