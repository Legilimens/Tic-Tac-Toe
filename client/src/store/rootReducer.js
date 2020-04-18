import { combineReducers } from 'redux';
import gameReducer from './game/reducers';
import appReducer from './app/reducers';

const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer,
});

export default rootReducer;
