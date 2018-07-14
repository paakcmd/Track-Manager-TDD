import { CREATE_TRACK } from './constants';
import { createTrackDispatch, createTrack } from './track';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

describe('track', () => {
  it('returns CREATE_TRACK when receives input', () => {
    // var f = new File([""], "filename", { type: 'text/html' });
    // const store = mockStore();
    // store.dispatch(createTrack(f);
    const schedule = 'testFileName';
    const expectedAction = { type: CREATE_TRACK, schedule };
    expect(createTrackDispatch(schedule)).toEqual(expectedAction)

  });
});
