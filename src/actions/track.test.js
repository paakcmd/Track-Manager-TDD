import { CREATE_TRACK } from './constants';
import { createTrack } from './track';

describe('track', () => {
  const text = 'example text';
  it('creates track when receives input', () => {
    const expectedAction = { type: CREATE_TRACK, text };
    expect(createTrack(text)).toEqual(expectedAction);
  });
});
