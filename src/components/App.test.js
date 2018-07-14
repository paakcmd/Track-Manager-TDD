import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import '../setupTests.js';
import '../tempPolyfills.js';

describe('App', () => {
  const app = shallow(<App />);

  it('renders properly', () => {
    expect(app).toMatchSnapshot();
  })

  it('contains a connected Track component', () => {
    expect(app.find('Connect(Track)').exists()).toBe(true);
  })
});
