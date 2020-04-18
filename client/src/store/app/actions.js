import {
  SHOW_LOADER, HIDE_LOADER, SHOW_ALERT, HIDE_ALERT,
} from '../types';

export const showAlert = (text) => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: text,
  });
  setTimeout(() => {
    dispatch({
      type: HIDE_ALERT,
    });
  }, 3 * 1000);
};

export const showLoader = () => ({
  type: SHOW_LOADER,
});

export const hideLoader = () => ({
  type: HIDE_LOADER,
});
