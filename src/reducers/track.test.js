import trackReducer from './track';
import { createTrack } from '../actions/track';
import { CREATE_TRACK } from '../actions/constants';

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
  });
});
