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
  describe('createTrackLogic', () => {
    it('returns proper schedule if possible', () => {
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

    it('return message when the system cant generate proper schedule', () => {
      const text = `Writing Fast Tests Against Enterprise Rails 70min
  Javascript 70min
  Lua for the Masses 70min
  Test 70min`;

      const expectedAction = [
        {
          time: 'sorry',
          event: "Can't generate proper combination of schedule"
        }
      ];
      expect(createTrackLogic(text)).toEqual(expectedAction);
    });
  });
});
