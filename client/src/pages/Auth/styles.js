import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
		marginBottom: 15,
  },
  paper: {
    minHeight: 140,
    width: 600,
    padding: theme.spacing(4),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    marginRigt: theme.spacing(2),
    marginLeft: theme.spacing(2),
  }
}));

export default useStyles;