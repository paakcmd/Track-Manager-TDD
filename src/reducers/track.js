import {
  CREATE_TRACK,
  SHOW_TRACK_BY_CURRENT_TRACK
} from '../actions/constants';

const initialState = {
  display: [],
  currentTrack: 0
};

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRACK:
      return {
        ...state,
        display: action.schedule.display
      }
    case SHOW_TRACK_BY_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.currentTrack
      };
    default:
      return state;
  }
};

export default trackReducer;
