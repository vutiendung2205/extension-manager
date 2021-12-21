import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import ExtensionsModule from './ExtensionsModule';
import ExtensionsTable from './ExtensionsTable';
import ExtensionDetail from './ExtensionDetail';
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
	const { view, page, detailId } = useSelector(state => state.App.settings);
	console.log('🚀 ~ Content ~ page', page);
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

	if (detailId) {
		return <ExtensionDetail />;
	}
	return (
		<Box sx={{ width: '100%', maxHeight: '400px' }} className={classes.root}>
			{display(view)}
		</Box>
	);
};
export default Content;
