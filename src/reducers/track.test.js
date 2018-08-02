import trackReducer from './track';
import { createTrack } from '../actions/track';
import {
  CREATE_TRACK,
  SHOW_TRACK_BY_CURRENT_TRACK
} from '../actions/constants';

describe('trackReducer', () => {
  describe('when initializing', () => {
    const initialState = { currentTrack: 0, display: [] };

    it('sets an initial state', () => {
      expect(trackReducer(undefined, {})).toEqual(initialState);
    });

    it('sets a state when receive CREATE_TRACK', () => {
      const schedule = { display: 'track' };
      const expectedAction = { currentTrack: 0, display: 'track' };
      expect(trackReducer(undefined, { type: CREATE_TRACK, schedule })).toEqual(
        expectedAction
      );
    });

    it('update display track when receive SHOW_TRACK_BY_CURRENT_TRACK', () => {
      const mockCurrentTrack = 1;
      const expectedAction = { currentTrack: 1, display: [] };
      expect(
        trackReducer(undefined, {
          type: SHOW_TRACK_BY_CURRENT_TRACK,
          currentTrack: mockCurrentTrack
        })
      ).toEqual(expectedAction);
    });
  });
});
