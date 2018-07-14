import { timeInterpret } from './time-interpret';

describe('timeInterpret', () => {
  it('creates list of time from text input', () => {
    const mockText = `Writing Fast Tests Against Enterprise Rails 60min
Overdoing it in Python 45min
min min 30min`
    const expectedAction = [{id: 0, time: 60}, {id:1, time:45}, {id:2, time:30}]
    expect(timeInterpret(mockText)).toEqual(expectedAction)
  })
})
