import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import ExtensionsModule from './ExtensionsModule';
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
	const { view } = useSelector(state => state.App.settings);
	const display = viewState => {
		switch (viewState) {
			case 'viewList':
				return <ExtensionsTable />;
			case 'viewModule':
				return <ExtensionsModule />;
			default:
				return <ExtensionsTable />;
		}
	};
	return (
		<Box sx={{ width: '100%', maxHeight: '400px' }} className={classes.root}>
			{display(view)}
		</Box>
	);
};
export default Content;
