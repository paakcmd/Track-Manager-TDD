import { CREATE_TRACK } from './constants';
import { readFile } from './helper/read-file';
import { timeInterpret } from '../domain-logic/time-interpret';
import { trackCalculate, scheduleMaker, timeDisplay } from '../domain-logic/track-calculate';

export const createTrack = file => {
  // if(file === 'testFileName'){return {type: CREATE_TRACK,file};} //for test
  return function(dispatch) {
    readFile(file).then(function(result) {
      console.log(result);
      const time = timeInterpret(result);
      var track = trackCalculate(time, 180).next().value;
      const schedule = scheduleMaker(time, track);
      const displaySchedule = timeDisplay(schedule, result);
      dispatch(createTrackDispatch(displaySchedule));
    });
  };
};

export function createTrackDispatch(schedule) {
  return {
    type: CREATE_TRACK,
    schedule
  };
}
