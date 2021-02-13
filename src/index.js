import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './bulmaswatch.min.css';
import './index.css';
import App from './components/App';
import store from './reducers'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,  
  document.getElementById('root')
);
