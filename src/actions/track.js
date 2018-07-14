import { CREATE_TRACK } from './constants';
import { readFile } from '../reducers/helper/read-file';
import { timeInterpret } from '../domain-logic/time-interpret';
import { trackCalculate, scheduleMaker, timeDisplay } from '../domain-logic/track-calculate';

export const createTrack = file => {
  return function(dispatch) {
    readFile(file).then(function(result) {
      const time = timeInterpret(result);
      var track = trackCalculate(time, 180).next().value;
      const schedule = scheduleMaker(time, track);
      const finalizeSchedule = timeDisplay(schedule, result);
      dispatch(createTrackDispatch(finalizeSchedule));
    });
  };
};

export function createTrackDispatch(schedule) {
  return {
    type: CREATE_TRACK,
    schedule
  };
}
