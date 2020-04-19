import { SET_GAME_LIST, SET_CURRENT_GAME } from '../types';

const initialState = {
  gameList: [],
  currentGame: {},
};

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_LIST:
      return { ...state, gameList: action.payload };
    case SET_CURRENT_GAME:
      return { ...state, currentGame: action.payload };
    default:
      return state;
  }
}

export default postsReducer;
