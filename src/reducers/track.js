import {
  CREATE_TRACK,
  SHOW_TRACK_BY_CURRENT_TRACK
} from '../actions/constants';

const initialState = {};

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRACK:
      return action.schedule;
    case SHOW_TRACK_BY_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.currentTrack,
        display: action.display
      };
    default:
      return state;
  }
};

export default trackReducer;
