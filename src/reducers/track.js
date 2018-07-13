import { CREATE_TRACK } from '../actions/constants';


const initialState = {
  tracks: {}
}

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRACK:

      return state;
    default:
      return state;
  }
};

export default trackReducer;
