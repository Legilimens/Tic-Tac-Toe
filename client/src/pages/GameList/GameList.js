import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import useGameList from '../../hooks/useGameList';
import useStyles from './styles';
import GameWrapper from '../../components/GameWrapper/GameWrapper';

function GameList() {
  const gameList = useGameList();
  const classes = useStyles();

  useEffect(() => {
  }, [gameList]);

  const handleNewGame = () => {

  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={4}>
        {gameList.map((game) => (
          <GameWrapper key={game.gameId} game={game} />
        ))}
      </Grid>
      <Tooltip title="Создать игру" aria-label="add">
        <Fab
          aria-label='Новая игра'
          className={classes.fab}
          color='primary'
          onClick={handleNewGame}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Grid>
  )
}

export default GameList;
