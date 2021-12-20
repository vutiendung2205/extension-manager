/* global chrome */
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import ExtensionTableRow from './ExtensionTableRow';

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
const ExtensionsTable = () => {
	const classes = useStyles();
	const extensions = useSelector(state => state.App.extensions);
	if (!extensions) {
		return <></>;
	}
	return (
		<Box sx={{ width: '100%', height: '400px' }} p="10px" className={classes.root}>
			{dataBox.map((val, index) => (
				<ExtensionTableRow key={index} {...val} />
			))}
		</Box>
	);
};
export default ExtensionsTable;
