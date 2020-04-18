import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameList } from '../store/game/actions';

const useGameList = () => {
  const gameList = useSelector((store) => store.game.gameList);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchGameList());
    }, 3 * 1000);
    return () => clearInterval(interval);
  }, [gameList])

  return gameList;
}

export default useGameList;