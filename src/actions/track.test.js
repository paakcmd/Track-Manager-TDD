import { CREATE_TRACK } from './constants';
import { createTrack } from './track';

describe('track', () => {
  const file = 'example text';
  it('creates track when receives input', () => {
    const expectedAction = { type: CREATE_TRACK, file };
    expect(createTrack(file)).toEqual(expectedAction);
  });
});
