import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  paper: {
    minHeight: 140,
    width: 400,
  },
  img: {
    width: 128,
    height: 128,
    margin: 'auto',
    display: 'block',
  },
  colorFirst: {
    color: '#f77171'
  },
  colorSecond: {
    color: '#5b5bec'
  },
  close: {
    cursor: 'pointer',
    color: '#afafaf',
    marginRight: 10,
  },
  button: {
    textDecoration: 'none',
  },
}));

export default useStyles;