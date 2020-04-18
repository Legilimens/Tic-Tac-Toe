import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import useStyles from './styles';

function Game() {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item>
        <Paper className={classes.paper}>
          This is game page
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Game;