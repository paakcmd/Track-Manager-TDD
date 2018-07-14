import { CREATE_TRACK } from './constants';
import { readFile } from './helper/read-file';
import { timeInterpret } from '../domain-logic/time-interpret';
import {
  trackCalculate,
  scheduleMaker,
  trackDisplay
} from '../domain-logic/track-calculate';


//this function read file send result to another function then dispatch result to reducer
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
  var track = trackCalculate(time, 180).next().value;
  if(track){
    const schedule = scheduleMaker(time, track);
    const displaySchedule = trackDisplay(schedule, result);
    return displaySchedule;
  }
  else {
    return [{ time:'sorry', event:'Can\'t generate proper combination of schedule' }]
  }
}

//action to reducer
export function createTrackDispatch(schedule) {
  return {
    type: CREATE_TRACK,
    schedule
  };
}
