import trackReducer from './track';
import { createTrack } from '../actions/track';
import {
  CREATE_TRACK,
  SHOW_TRACK_BY_CURRENT_TRACK
} from '../actions/constants';

describe('trackReducer', () => {
  describe('when initializing', () => {
    const initialState = {};

    it('sets an initial state', () => {
      expect(trackReducer(undefined, {})).toEqual(initialState);
    });

    it('sets a state when receive CREATE_TRACK', () => {
      const schedule = 'schedule';
      expect(trackReducer(undefined, { type: CREATE_TRACK, schedule })).toEqual(
        schedule
      );
    });

    it('update display track when receive SHOW_TRACK_BY_CURRENT_TRACK', () => {
      const schedule = 'schedule';
      const mockDisplay = 'mock display';
      const mockCurrentTrack = 0;
      const expectedAction = {
        currentTrack: 0,
        display: 'mock display',
        schedule: 'schedule',
        type: 'CREATE_TRACK'
      };

      expect(
        trackReducer(
          { type: CREATE_TRACK, schedule },
          {
            type: SHOW_TRACK_BY_CURRENT_TRACK,
            display: mockDisplay,
            currentTrack: mockCurrentTrack
          }
        )
      ).toEqual(expectedAction);
    });
  });
});
