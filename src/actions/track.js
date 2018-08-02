import { CREATE_TRACK, SHOW_TRACK_BY_CURRENT_TRACK } from './constants';
import { readFile } from './helper/read-file';
import { timeInterpret } from '../domain-logic/time-interpret';
import {
  trackCalculate,
  scheduleMaker,
  trackDisplay,
  calculateFreeActivities,
  sumAllTrackTime,
  removeLunchAndNetwork,
  setNetworkTimeToLatest
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
export function createTrackLogic(file) {
  const time = timeInterpret(file);
  var freeActivities = time;
  var allTracks = [];
  var networkTime = 0;
  while (true) {
    var track = trackCalculate(freeActivities, 180).next().value;
    if (track) {
      freeActivities = calculateFreeActivities(freeActivities, track);
      const schedule = scheduleMaker(freeActivities, track);
      const totalTimeInSchedule = sumAllTrackTime(schedule);
      if (totalTimeInSchedule > networkTime) {
        networkTime = totalTimeInSchedule;
      }
      freeActivities = calculateFreeActivities(
        freeActivities,
        removeLunchAndNetwork(schedule)
      );
      const displaySchedule = trackDisplay(schedule, file);
      allTracks.push(displaySchedule);
    } else {
      break;
    }
  }
  allTracks = setNetworkTimeToLatest(allTracks, networkTime);
  if (allTracks.length === 0) {
    return {
      display: [
        {
          event: "Can't generate proper combination of schedule",
          time: 'sorry'
        }
      ]
    };
  }
  return {
    display: allTracks
  };
}

//action to reducer
export function createTrackDispatch(schedule) {
  return {
    type: CREATE_TRACK,
    schedule
  };
}

export function changeCurrentTrack(newTrack) {
  return {
    type: SHOW_TRACK_BY_CURRENT_TRACK,
    currentTrack: newTrack
  };
}
