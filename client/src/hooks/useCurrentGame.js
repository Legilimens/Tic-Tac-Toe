import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameState } from '../store/game/actions';

const useCurrentGame = (gameId) => {
  const currentGame = useSelector((store) => store.game.currentGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGameState(gameId));
    const interval = setInterval(() => {
      dispatch(fetchGameState(gameId));
    }, 3 * 1000);
    return () => clearInterval(interval);
  }, []);

  return currentGame;
};

export default useCurrentGame;
