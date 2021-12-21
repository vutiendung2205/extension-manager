/* global chrome */
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import ExtensionTableRow from './ExtensionTableRow';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ExtensionsModuleRow from './ExtensionsModuleRow';
const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			display: 'none'
		}
	},
	noBorder: {
		'&:hover': {
			outline: 'none',
			border: 'none'
		},
		'&:focus': {
			outline: 'none',
			border: 'none'
		}
	},
	nowrapLine: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
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
	if (!extensions) {
		return <></>;
	}
	return (
		<Box sx={{ width: '100%', height: '400px' }} p="10px" className={classes.root}>
			{dataBox.map((val, index) => (
				<ExtensionsModuleRow key={index} {...val} />
			))}
		</Box>
	);
};
export default ExtensionsModule;
