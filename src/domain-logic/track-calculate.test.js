import {
  trackCalculate,
  scheduleMaker,
  timeSum,
  timeDisplay
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
      {id: 0, time: 60},
      {id: 1, time: 45},
      {id: 2, time: 30},
      {id: 3, time: 45},
      {id: "Lunch", time: 60},
      {id: 4, time: 45},
      {id: 5, time: 5},
      {id: 6, time: 60},
      {id: 7, time: 45},
      {id: 8, time: 30},
      {id: 9, time: 30},
      {id: "Network Event",time: 60}
    ]
    expect(scheduleMaker(mockTime, mockTrack)).toEqual(expectedAction);
  });
});

describe('function timeSum', () => {
  it('generates time correctly', () => {
    expect(timeSum(0,60)).toEqual(60);
    expect(timeSum(600,60)).toEqual(660);
  })
})
