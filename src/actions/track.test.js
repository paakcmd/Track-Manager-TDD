import { CREATE_TRACK } from './constants';
import { createTrackDispatch, createTrack, createTrackLogic } from './track';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

describe('track', () => {
  it('returns CREATE_TRACK when receives input', () => {
    const schedule = 'testFileName';
    const expectedAction = { type: CREATE_TRACK, schedule };
    expect(createTrackDispatch(schedule)).toEqual(expectedAction);
  });

  it('returns proper schedule after input all the messages read from the file', () => {
    const text = `Writing Fast Tests Against Enterprise Rails 60min
Javascript 60min
Lua for the Masses 60min`;
    const expectedAction = [
      {
        event: 'Writing Fast Tests Against Enterprise Rails 60min',
        time: '9.00'
      },
      { event: 'Javascript 60min', time: '10.00' },
      { event: 'Lua for the Masses 60min', time: '11.00' },
      { event: 'Lunch', time: '12.00' },
      { event: 'Network Event', time: '13.00' }
    ];
    expect(createTrackLogic(text)).toEqual(expectedAction);
  });
});
