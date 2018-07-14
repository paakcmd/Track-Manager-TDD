import {
  trackCalculate,
  scheduleMaker,
  timeSum,
  trackDisplay
} from './track-calculate';

describe('function trackCalculate', () => {
  const testInput = [
    { id: 0, time: 8 },
    { id: 1, time: 7 },
    { id: 2, time: 4 },
    { id: 2, time: 3 }
  ];
  it('calculates first combination for schedule', () => {
    const expectedAction = [{ id: 0, time: 8 }, { id: 1, time: 7 }];
    expect(trackCalculate(testInput, 15).next().value).toEqual(expectedAction);
  });
  it('calculates all combination for schedule', () => {
    const expectedAction = [
      [{ id: 0, time: 8 }, { id: 1, time: 7 }],
      [{ id: 0, time: 8 }, { id: 2, time: 4 }, { id: 2, time: 3 }]
    ];
    expect([...trackCalculate(testInput, 15)]).toEqual(expectedAction);
  });
});

describe('function scheduleMaker', () => {
  it('Genereates rough schedule', () => {
    const mockTime = [
      { id: 0, time: 60 },
      { id: 1, time: 45 },
      { id: 2, time: 30 },
      { id: 3, time: 45 },
      { id: 4, time: 45 },
      { id: 5, time: 5 },
      { id: 6, time: 60 },
      { id: 7, time: 45 },
      { id: 8, time: 30 },
      { id: 9, time: 30 },
      { id: 10, time: 45 },
      { id: 11, time: 60 },
      { id: 12, time: 600 },
      { id: 13, time: 45 },
      { id: 14, time: 30 },
      { id: 15, time: 30 },
      { id: 16, time: 60 },
      { id: 17, time: 30 },
      { id: 18, time: 30 }
    ];
    const mockTrack = [
      { id: 0, time: 60 },
      { id: 1, time: 45 },
      { id: 2, time: 30 },
      { id: 3, time: 45 }
    ];
    const expectedAction = [
      { id: 0, time: 60 },
      { id: 1, time: 45 },
      { id: 2, time: 30 },
      { id: 3, time: 45 },
      { id: 'Lunch', time: 60 },
      { id: 4, time: 45 },
      { id: 5, time: 5 },
      { id: 6, time: 60 },
      { id: 7, time: 45 },
      { id: 8, time: 30 },
      { id: 9, time: 30 },
      { id: 'Network Event', time: 60 }
    ];
    expect(scheduleMaker(mockTime, mockTrack)).toEqual(expectedAction);
  });
});

describe('function timeSum', () => {
  it('generates time correctly', () => {
    expect(timeSum(0, 60)).toEqual(60);
    expect(timeSum(600, 60)).toEqual(660);
  });
});

describe('function trackDisplay', () => {
  it('generate tracks for display', () => {
    const mockSchedule = [
      { id: 0, time: 60 },
      { id: 1, time: 45 },
      { id: 2, time: 30 },
      { id: 3, time: 45 },
      { id: 'Lunch', time: 60 },
      { id: 4, time: 45 },
      { id: 5, time: 5 },
      { id: 6, time: 60 },
      { id: 7, time: 45 },
      { id: 8, time: 30 },
      { id: 9, time: 30 },
      { id: 'Network Event', time: 60 }
    ];

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
    const expectedAction = [
      {
        time: '9.00',
        event: 'Writing Fast Tests Against Enterprise Rails 60min'
      },
      { time: '10.00', event: 'Overdoing it in Python 45min' },
      { time: '10.45', event: 'Lua for the Masses 30min' },
      {
        time: '11.15',
        event: 'Ruby Errors from Mismatched Gem Versions 45min'
      },
      { time: '12.00', event: 'Lunch' },
      { time: '13.00', event: 'Common Ruby Errors 45min' },
      { time: '13.45', event: 'Rails for Python Developers lightning' },
      { time: '13.50', event: 'Communicating Over Distance 60min' },
      { time: '14.50', event: 'Accounting-Driven Development 45min' },
      { time: '15.35', event: 'Woah 30min' },
      { time: '16.05', event: 'Sit Down and Write 30min' },
      { time: '16.35', event: 'Network Event' }
    ];
    expect(trackDisplay(mockSchedule, mockText)).toEqual(expectedAction);
  });
});
