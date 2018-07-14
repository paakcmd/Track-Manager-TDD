import { CREATE_TRACK } from '../actions/constants';

const initialState = {};

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRACK:
      return action.schedule;
    default:
      return state;
  }
};

export default trackReducer;
