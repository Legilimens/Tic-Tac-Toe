import { SET_GAME_LIST } from '../types';

const initialState = {
  gameList: [],
};

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_LIST:
      return { ...state, gameList: action.payload };
    default:
      return state;
  }
}

export default postsReducer;
