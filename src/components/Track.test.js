import React from 'react';
import { mount, shallow } from 'enzyme';
import { Track } from './Track';

describe('Track', () => {
  const mockCreateTrack = jest.fn();
  var props = {
    track: [{ time: '9.00', event: 'test' }],
    createTrack: mockCreateTrack
  };
  var track = shallow(<Track {...props} />);
  it('renders properly', () => {
    expect(track).toMatchSnapshot();
  });

  describe('when user upload file', () => {
    beforeEach(() => {
      track
        .find('#file')
        .simulate('change', { target: { files: [(0: 'test')] } });
    });
    it('triggers action', () => {
      expect(mockCreateTrack).toHaveBeenCalled();
    });
  });

  describe('table generator', () => {
    it('generates list of tracks', () => {
      expect(track.find('#emptyList').exists()).toBe(false);
    });

    it('generates empty list when there is no track', () => {
      props.track = {};
      track = mount(<Track {...props} />);
      expect(track.find('#emptyList').exists()).toBe(true);
    });
  });
});
