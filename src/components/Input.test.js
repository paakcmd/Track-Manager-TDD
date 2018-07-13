import React from 'react';
import { shallow } from 'enzyme';
import { Input } from './Input';

describe('Input', () => {
  const input = shallow(<Input />);
  it('renders properly', () => {
    expect(input).toMatchSnapshot();
  })
})
