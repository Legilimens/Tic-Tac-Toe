import {
  SET_USER_ID, SET_IS_AUTH,
} from '../types';

const initialState = {
  userId: null,
  isAuth: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    case SET_IS_AUTH:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}

export default appReducer;
