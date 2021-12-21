/* global chrome */
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';

import ExtensionsModuleRow from './ExtensionsModuleRow';

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			display: 'none'
		}
	}
}));
const dataBox = [
	{
		title: 'Extension',
		type: 'extension',
		backgroundColor: '#FFAFAF'
	},
	{
		title: 'Chrome Apps',
		type: 'legacy_packaged_app',
		backgroundColor: '#FBFFE2'
	},
	{
		title: 'Themes',
		type: 'theme',
		backgroundColor: '#FFEBCC'
	}
];
const ExtensionsModule = () => {
	const classes = useStyles();
	const extensions = useSelector(state => state.App.extensions);
	const { type } = useSelector(state => state.App.settings);

	if (!extensions) {
		return <></>;
	}
	return (
		<Box sx={{ width: '100%', height: '320px' }} p="10px" className={classes.root}>
			{dataBox
				.filter(data => {
					if (type === 'all') {
						return data;
					} else {
						return data.type === type;
					}
				})
				.map((val, index) => (
					<ExtensionsModuleRow key={index} {...val} />
				))}
		</Box>
	);
};
export default ExtensionsModule;
