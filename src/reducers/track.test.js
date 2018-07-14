import trackReducer from './track';
import { createTrack } from '../actions/track';

describe('trackReducer', () => {
  describe('when initializing', () => {
    const initialState = { track: {} };

    it('sets an initial state', () => {
      expect(trackReducer(undefined, {})).toEqual(initialState);
    });
  });
});
