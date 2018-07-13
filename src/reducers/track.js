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
      var a = trackCalculate([1,2,3,4,5,6,7,8,9,10],15)
      console.log(a);
      readFile(action.file).then(result => timeInterpret(result))
      return state;
    default:
      return state;
  }
};

export default trackReducer;
