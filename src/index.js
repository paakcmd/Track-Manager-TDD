import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import trackReducer from './reducers/track';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
render(
  <Provider store={createStoreWithMiddleware(trackReducer)} >
    <App/>
  </Provider>,
  document.getElementById('root'));
