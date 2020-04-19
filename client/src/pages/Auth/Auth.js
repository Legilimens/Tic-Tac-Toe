import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import { registration, auth } from '../../api/api';
import { useAuth } from '../../hooks';

function Auth() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleRegistration = async () => {
    try {
      await registration({...form});
      alert('Успешная регистрация! Теперь Вы можете авторизоваться.');
    } catch(e) {}
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      const res = await login({...form});
      dispatch(auth(res.data.token, res.data.userId));
    } catch(e) {}
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item>
        <form noValidate autoComplete="off" onSubmit={handleAuth}>
          <Paper className={classes.paper}>
            <Grid item>
              <TextField
                className={classes.field}
                type="text"
                name="email"
                label="Введите Ваш email"
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.field}
                type="password"
                name="password"
                label="Введите Ваш пароль"
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Авторизация
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={handleRegistration}
              >
                Регистрация
              </Button>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </Grid>
  )
}

export default Auth;
