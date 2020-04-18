import {
  SET_GAME_LIST,
} from '../types';
import { getGameList } from '../../api/api'

export const setGameList = (data) => ({
  type: SET_GAME_LIST,
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
