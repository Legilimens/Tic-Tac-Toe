import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: theme.spacing(2),
		marginBottom: 15,
	},
	fab: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

export default useStyles;