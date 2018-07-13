import React from 'react';
import { shallow } from 'enzyme';
import { Track } from './Track';

describe('Track', () => {
  const mockCreateTrack = jest.fn();
  const props = { createTrack: mockCreateTrack }
  const track = shallow(<Track {...props} />);
  it('renders properly', () => {
    expect(track).toMatchSnapshot();
  })

  describe('when user upload file', () => {
    beforeEach(() => {
      track.find('#input').simulate('change', {target: {files: [0: 'test']}})
    })
    it('send file to the reducer', () => {
      expect(mockCreateTrack).toHaveBeenCalledWith(0);
    })
  })
})
