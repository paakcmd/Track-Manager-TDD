import { CREATE_TRACK } from './constants';
import { readFile } from './helper/read-file';
import { timeInterpret } from '../domain-logic/time-interpret';
import {
  trackCalculate,
  scheduleMaker,
  trackDisplay
} from '../domain-logic/track-calculate';

// this function is untested because it's extremely hard to mock a real file to test
export const createTrack = file => {
  return function(dispatch) {
    readFile(file).then(function(result) {
      const displaySchedule = createTrackLogic(result);
      dispatch(createTrackDispatch(displaySchedule));
    });
  };
};

//seperate createTrackLogic to test because createTrack is extremely hard to mock file
export function createTrackLogic(result) {
  const time = timeInterpret(result);
  var track = trackCalculate(time, 180).next().value;
  const schedule = scheduleMaker(time, track);
  const displaySchedule = trackDisplay(schedule, result);
  return displaySchedule;
}

export function createTrackDispatch(schedule) {
  return {
    type: CREATE_TRACK,
    schedule
  };
}
