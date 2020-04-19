import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useCurrentGame } from '../../hooks';
import useStyles from './styles';

function Game() {
  const { id } = useParams();
  const currentGame = useCurrentGame(id);
  const classes = useStyles();
  console.log(currentGame)

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item>
        <Paper className={classes.paper}>
          This is game page
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Game;