import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
		marginBottom: 15,
  },
  paper: {
    minHeight: 140,
    width: 400,
  },
}));

export default useStyles;