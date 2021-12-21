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
	const extensions = useSelector(state => state.App.extensions);
	const { type, title } = props;
	// if (!extensions) {
	// 	return <></>;
	// }
	return (
		<React.Fragment>
			<Divider textAlign="left">{title}</Divider>
			<List
				sx={{
					width: '100%',
					bgcolor: 'background.paper'
				}}
			>
				{extensions
					.filter(extension => extension.type == type)
					.map(extension => {
						const extensionIconUrl = extension.icons ? extension.icons[extension.icons.length - 1].url : '';
						return (
							<li key={extension.id}>
								<ListItem button={true}>
									<ListItemAvatar>
										<Avatar
											alt={extension.name}
											src={extensionIconUrl}
											{...stringAvatar(extension.name)}
											className={`${classes.nowrapLine} ${
												extension.enabled ? classes.enable : classes.disable
											}`}
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
