import {
  SET_USER_ID
} from '../types';


export const setUserId = (userId) => ({
  type: SET_USER_ID,
  payload: userId,
});

export const setIsAuth = (value) => ({
  type: SET_IS_AUTH,
  payload: value,
});

export const authUser = (userId) => (dispatch) => {
  dispatch(setUserId(userId));
  dispatch(setIsAuth(true));
};
