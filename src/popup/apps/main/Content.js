import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import ExtensionsTable from './ExtensionsTable';

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto'
		// backgroundColor: '#FBFFE2'
	},
	Typography: {
		textAlign: 'center'
	}
}));
const Content = () => {
	const classes = useStyles();
	return (
		<Box sx={{ width: '100%', maxHeight: '400px' }} className={classes.root}>
			<ExtensionsTable />
		</Box>
	);
};
export default Content;
