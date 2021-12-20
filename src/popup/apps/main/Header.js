import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#f7f7f7'
	},
	Typography: {
		textAlign: 'center',
		margin: 'auto',
		lineHeight: '50px'
	}
}));
const Header = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box sx={{ width: '100%', height: '50px' }} className={classes.root}>
				<Typography variant="h6" sx={{ lineHeight: '50px' }} className={classes.Typography}>
					Extension Manager
				</Typography>
			</Box>
			<Divider />
		</React.Fragment>
	);
};
export default Header;
