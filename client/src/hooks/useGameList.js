import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameList } from '../store/game/actions';

const useGameList = () => {
  const gameList = useSelector((store) => store.game.gameList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGameList());
    const interval = setInterval(() => {
      dispatch(fetchGameList());
    }, 3 * 1000);
    return () => clearInterval(interval);
  }, []);

  return gameList;
};

export default useGameList;
