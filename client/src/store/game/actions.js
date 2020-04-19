import {
  SET_GAME_LIST,
  SET_CURRENT_GAME,
} from '../types';
import { getGameList, getGameState } from '../../api/api';

export const setGameList = (data) => ({
  type: SET_GAME_LIST,
  payload: data,
});

export const setCurrentGame = (data) => ({
  type: SET_CURRENT_GAME,
  payload: data,
});

export const fetchGameList = () => async (dispatch) => {
  try {
    const res = await getGameList();
    dispatch(setGameList(res.data));
  } catch (e) {
    console.log(e);
  }
};

export const fetchGameState = (gameId) => async (dispatch) => {
  try {
    const res = await getGameState(gameId);
    dispatch(setCurrentGame(res.data));
  } catch (e) {
    console.log(e);
  }
};
