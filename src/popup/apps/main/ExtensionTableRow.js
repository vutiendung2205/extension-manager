/* global chrome */
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { changeStatusExtension, removeExtension } from '../store/extensionsSlice';

const useStyles = makeStyles(theme => ({
	Typography: {
		textAlign: 'center'
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
	avatar: {
		cursor: 'pointer'
	},
	scroll: {
		overflow: 'auto'
	},
	disable: {
		filter: 'grayscale(100%)',
		opacity: 0.4
	},
	enable: {
		opacity: 1
	}
}));

const stringAvatar = name => {
	return {
		children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`
	};
};
const ExtensionTableRow = props => {
	const { type, title } = props;
	const classes = useStyles();
	const dispatch = useDispatch();
	const extensions = useSelector(state => state.App.extensions);
	const handleClick = extension => {
		chrome.management.setEnabled(extension.id, !extension.enabled, () => {
			if (extension.type != 'theme') {
				dispatch(changeStatusExtension(extension.id));
			} else {
				dispatch(removeExtension(extension.id));
			}
		});
	};
	return (
		<React.Fragment>
			<Divider textAlign="left">{title}</Divider>
			<Grid container spacing={3}>
				{extensions
					.filter(extension => extension.type == type)
					.map(extension => {
						const extensionIconUrl = extension.icons ? extension.icons[extension.icons.length - 1].url : '';
						return (
							<Grid item xs="auto" key={extension.id}>
								<Tooltip title={extension.name}>
									<IconButton className={classes.noBorder} onClick={() => handleClick(extension)}>
										<Avatar
											alt={extension.name}
											src={extensionIconUrl}
											className={extension.enabled ? classes.enable : classes.disable}
											{...stringAvatar(extension.name)}
										/>
									</IconButton>
								</Tooltip>
							</Grid>
						);
					})}
			</Grid>
		</React.Fragment>
	);
};
export default ExtensionTableRow;
