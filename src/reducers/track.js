import { CREATE_TRACK } from '../actions/constants';
import { readFile } from './helper/read-file';
import { timeInterpret } from '../domain-logic/time-interpret';
import { trackCalculate } from '../domain-logic/track-calculate';

const initialState = {
  tracks: {}
}

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRACK:
      readFile(action.file).then(function(result) {
        const time = timeInterpret(result)
        const test = [{id:0,time:45},{id:1,time:30},{id:2,time:40},{id:3,time:20},{id:2,time:10}]
        var a = trackCalculate(time,420).next().value;
        console.log(a)
      })
      return state;
    default:
      return state;
  }
};

export default trackReducer;
