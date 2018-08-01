import { CREATE_TRACK, SHOW_TRACK_BY_CURRENT_TRACK } from './constants';
import { readFile } from './helper/read-file';
import { timeInterpret } from '../domain-logic/time-interpret';
import {
  trackCalculate,
  scheduleMaker,
  trackDisplay
} from '../domain-logic/track-calculate';

//this function read file then send result to another function then dispatch result to reducer
export const createTrack = file => {
  return function(dispatch) {
    readFile(file).then(function(result) {
      const displaySchedule = createTrackLogic(result);
      dispatch(createTrackDispatch(displaySchedule));
    });
  };
};

//this function modifies text messages to ready-to-display schedule object
export function createTrackLogic(result) {
  const time = timeInterpret(result);
  var allTrack = [...trackCalculate(time, 180)];
  var lengthOfAllTrack = allTrack.length;
  var track = trackCalculate(time, 180).next().value;
  if (track) {
    const schedule = scheduleMaker(time, track);
    const displaySchedule = trackDisplay(schedule, result);
    return {
      display: displaySchedule,
      allTrack: allTrack,
      currentTrack: 1,
      lengthOfAllTrack: lengthOfAllTrack,
      file: result
    };
  } else {
    return {
      display: [
        {
          time: 'sorry',
          event: "Can't generate proper combination of schedule"
        }
      ]
    };
  }
}

//action to reducer
export function createTrackDispatch(schedule) {
  return {
    type: CREATE_TRACK,
    schedule
  };
}

export function showTrackByCurrentTrack(file, newTrack, combination) {
  const time = timeInterpret(file);
  const schedule = scheduleMaker(time, combination);
  const displaySchedule = trackDisplay(schedule, file);
  return {
    type: SHOW_TRACK_BY_CURRENT_TRACK,
    display: displaySchedule,
    currentTrack: newTrack
  };
}
