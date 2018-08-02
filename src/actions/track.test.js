import { CREATE_TRACK } from './constants';
import {
  createTrackDispatch,
  createTrack,
  createTrackLogic,
  changeCurrentTrack
} from './track';
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
    it('returns proper schedule when only one track possible', () => {
      const mockText = `Writing Fast Tests Against Enterprise Rails 60min
Javascript 60min
Lua for the Masses 60min`;
      const expectedAction = {
        display: [
          [
            {
              event: 'Writing Fast Tests Against Enterprise Rails 60min',
              time: '9.00'
            },
            { event: 'Javascript 60min', time: '10.00' },
            { event: 'Lua for the Masses 60min', time: '11.00' },
            { event: 'Lunch', time: '12.00' },
            { event: 'Network Event', time: '16.00' }
          ]
        ]
      };
      expect(createTrackLogic(mockText)).toEqual(expectedAction);
    });

    it('returns proper schedule if possible when many tracks possible', () => {
      const mockText = `Writing Fast Tests Against Enterprise Rails 60min
  Overdoing it in Python 45min
  Lua for the Masses 30min
  Ruby Errors from Mismatched Gem Versions 45min
  Common Ruby Errors 45min
  Rails for Python Developers lightning
  Communicating Over Distance 60min
  Accounting-Driven Development 45min
  Woah 30min
  Sit Down and Write 30min
  Pair Programming vs Noise 45min
  Rails Magic 60min
  Ruby on Rails: Why We Should Move On 600min
  Clojure Ate Scala (on my project) 45min
  Programming in the Boondocks of Seattle 30min
  Ruby vs. Clojure for Back-End Development 30min
  Ruby on Rails Legacy App Maintenance 60min
  A World Without HackerNews 30min
  User Interface CSS in Rails Apps 30min`;

      const expectedAction = {
        display: [
          [
            {
              event: 'Writing Fast Tests Against Enterprise Rails 60min',
              time: '9.00'
            },
            { event: '  Overdoing it in Python 45min', time: '10.00' },
            { event: '  Lua for the Masses 30min', time: '10.45' },
            {
              event: '  Ruby Errors from Mismatched Gem Versions 45min',
              time: '11.15'
            },
            { event: 'Lunch', time: '12.00' },
            { event: '  Common Ruby Errors 45min', time: '13.00' },
            { event: '  Rails for Python Developers lightning', time: '13.45' },
            { event: '  Communicating Over Distance 60min', time: '13.50' },
            { event: '  Accounting-Driven Development 45min', time: '14.50' },
            { event: '  Woah 30min', time: '15.35' },
            { event: '  Sit Down and Write 30min', time: '16.05' },
            { event: 'Network Event', time: '16.35' }
          ],
          [
            { event: '  Pair Programming vs Noise 45min', time: '9.00' },
            { event: '  Rails Magic 60min', time: '9.45' },
            {
              event: '  Clojure Ate Scala (on my project) 45min',
              time: '10.45'
            },
            {
              event: '  Programming in the Boondocks of Seattle 30min',
              time: '11.30'
            },
            { event: 'Lunch', time: '12.00' },
            {
              event: '  Ruby vs. Clojure for Back-End Development 30min',
              time: '13.00'
            },
            {
              event: '  Ruby on Rails Legacy App Maintenance 60min',
              time: '13.30'
            },
            { event: '  A World Without HackerNews 30min', time: '14.30' },
            {
              event: '  User Interface CSS in Rails Apps 30min',
              time: '15.00'
            },
            { event: 'Network Event', time: '16.35' }
          ]
        ]
      };
      expect(createTrackLogic(mockText)).toEqual(expectedAction);
    });

    it('return message when the system cant generate proper schedule', () => {
      const text = `Writing Fast Tests Against Enterprise Rails 70min
  Javascript 70min
  Lua for the Masses 70min
  Test 70min`;

      const expectedAction = {
        display: [
          {
            time: 'sorry',
            event: "Can't generate proper combination of schedule"
          }
        ]
      };
      expect(createTrackLogic(text)).toEqual(expectedAction);
    });

    describe('show track by current track', () => {
      const expectedAction = {
        currentTrack: 1,
        type: 'SHOW_TRACK_BY_CURRENT_TRACK'
      };
      expect(changeCurrentTrack(1)).toEqual(expectedAction);
    });
  });
});
