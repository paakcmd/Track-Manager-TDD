import { CREATE_TRACK } from '../actions/constants';

const initialState = {
  tracks: {}
}

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRACK:
      console.log("reducerrrrrrr")
      console.log(action);
      return state

    default:
      return state;
  }
};

export default trackReducer;
