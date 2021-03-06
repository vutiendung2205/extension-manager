/* global chrome */
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import { setDetailId } from '../store/settingsSlice';
import { changeStatusExtension, removeExtension } from '../store/extensionsSlice';

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
const ExtensionsModuleRow = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const extensions = useSelector(state => state.App.extensions);
	const { type, title } = props;

	const { search } = useSelector(state => state.App.settings);
	const extensionArr = extensions
		.filter(extension => extension.type == type)
		.filter(extension => extension.name.toLowerCase().includes(search));

	const handleClick = extensionId => {
		dispatch(setDetailId(extensionId));
	};
	const handleChangeStatus = (event, extension) => {
		event.stopPropagation();
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
			<List
				sx={{
					width: '100%',
					bgcolor: 'background.paper'
				}}
			>
				{extensionArr
					.filter(extension => extension.type == type)
					.map(extension => {
						const extensionIconUrl = extension.icons ? extension.icons[extension.icons.length - 1].url : '';
						return (
							<li key={extension.id}>
								<ListItem button={true} onClick={() => handleClick(extension.id)}>
									<ListItemAvatar>
										<Avatar
											alt={extension.name}
											src={extensionIconUrl}
											{...stringAvatar(extension.name)}
											className={`${classes.nowrapLine} ${
												extension.enabled ? classes.enable : classes.disable
											}`}
											onClick={event => handleChangeStatus(event, extension)}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={extension.name}
										secondary={extension.description}
										className={extension.enabled ? classes.enable : classes.disable}
										secondaryTypographyProps={{ className: classes.nowrapLine }}
									/>
								</ListItem>
								<Divider />
							</li>
						);
					})}
			</List>
		</React.Fragment>
	);
};
export default ExtensionsModuleRow;
