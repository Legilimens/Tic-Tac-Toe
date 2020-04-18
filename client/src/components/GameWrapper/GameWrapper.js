import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SportsEsportsRoundedIcon from '@material-ui/icons/SportsEsportsRounded';
import Close from '@material-ui/icons/Close';

import Players from './../../components/Players';

import useStyles from './styles';

function GameWrapper(props) {
  const { game } = props;
  const classes = useStyles();

  const removeGame = async (gameId) => {
    // const res = await axios.post('/game/remove', {
    //   roomId
    // });
    // setGameList(res.data);
  }

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid className={game.gameId % 2 === 0 ? classes.colorFirst : classes.colorSecond} item>
              <SportsEsportsRoundedIcon className={classes.img} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1"><b>Комната: {game.gameId}</b></Typography>
                  <Players
                    fs={16}
                    players={game.players}
                  />
                  <Typography variant="body2" color="textSecondary">
                    Игроков: {game.players[2].id === null ? 1 : 2} из 2
                  </Typography>
                </Grid>
                <Grid item>
                  <Link to={`/game/${game.gameId}`}>
                    <Button variant="outlined" color="primary" className={classes.button}>
                      Присоединиться
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              {/* <Grid
                item
                className={game.players[1].id !== localStorage.getItem('playerId') ? 'hide' : null}
              > */}
                <Typography variant="subtitle1">
                  <Close
                    className={classes.close}
                    onClick={() => removeGame(game.gameId)}
                  />
                </Typography>
              {/* </Grid> */}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default GameWrapper;