import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import trackReducer from './reducers/track';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(trackReducer);

render(
  <Provider store={store} >
    <App/>
  </Provider>,
  document.getElementById('root'));
