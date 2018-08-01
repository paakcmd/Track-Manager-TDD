import { CREATE_TRACK } from './constants';
import {
  createTrackDispatch,
  createTrack,
  createTrackLogic,
  showTrackByCurrentTrack
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
    it('returns proper schedule if possible', () => {
      const text = `Writing Fast Tests Against Enterprise Rails 60min
Javascript 60min
Lua for the Masses 60min`;
      const expectedAction = {
        allTrack: [
          [{ id: 0, time: 60 }, { id: 1, time: 60 }, { id: 2, time: 60 }]
        ],
        currentTrack: 1,
        display: [
          {
            event: 'Writing Fast Tests Against Enterprise Rails 60min',
            time: '9.00'
          },
          { event: 'Javascript 60min', time: '10.00' },
          { event: 'Lua for the Masses 60min', time: '11.00' },
          { event: 'Lunch', time: '12.00' },
          { event: 'Network Event', time: '13.00' }
        ]
      };
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
      const file = `Woah 30min
Sit Down and Write 30min
Pair Programming vs Noise 45min
Rails Magic 60min
Ruby on Rails: Why We Should Move On 60min
Clojure Ate Scala (on my project) 45min
Programming in the Boondocks of Seattle 30min
Ruby vs. Clojure for Back-End Development 30min
Ruby on Rails Legacy App Maintenance 60min
A World Without HackerNews 30min
User Interface CSS in Rails Apps 30min`;

      const currentTrack = 1;
      const combination = [
        { id: 1, time: 30 },
        { id: 2, time: 30 },
        { id: 3, time: 45 },
        { id: 6, time: 45 },
        { id: 10, time: 30 }
      ];
      const expectedAction = {
        currentTrack: 1,
        display: [
          { event: 'Sit Down and Write 30min', time: '9.00' },
          { event: 'Pair Programming vs Noise 45min', time: '9.30' },
          { event: 'Rails Magic 60min', time: '10.00' },
          {
            event: 'Programming in the Boondocks of Seattle 30min',
            time: '10.45'
          },
          { event: 'User Interface CSS in Rails Apps 30min', time: '11.30' },
          { event: 'Lunch', time: '12.00' },
          { event: 'Woah 30min', time: '13.00' },
          {
            event: 'Ruby on Rails: Why We Should Move On 60min',
            time: '13.30'
          },
          { event: 'Clojure Ate Scala (on my project) 45min', time: '14.30' },
          {
            event: 'Ruby vs. Clojure for Back-End Development 30min',
            time: '15.15'
          },
          {
            event: 'Ruby on Rails Legacy App Maintenance 60min',
            time: '15.45'
          },
          { event: 'Network Event', time: '16.45' }
        ],
        type: 'SHOW_TRACK_BY_CURRENT_TRACK'
      };
      expect(showTrackByCurrentTrack(file, currentTrack, combination)).toEqual(
        expectedAction
      );
    });
  });
});
