/* global chrome */
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { changeStatusExtension, removeExtension } from '../store/extensionsSlice';
const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto'
		// backgroundColor: '#FBFFE2'
	},
	Typography: {
		textAlign: 'center'
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
const ExtensionDetail = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { detailId } = useSelector(state => state.App.settings);
	const extensions = useSelector(state => state.App.extensions);
	const extensionDetail = extensions.filter(extension => extension.id === detailId)[0];
	const { enabled } = extensionDetail;
	const handleChange = event => {
		chrome.management.setEnabled(extensionDetail.id, !extensionDetail.enabled, () => {
			dispatch(changeStatusExtension(detailId));
		});
	};
	const handleRemove = () => {
		chrome.management.setEnabled(extensionDetail.id, !extensionDetail.enabled, () => {
			dispatch(removeExtension(extensionDetail.id));
		});
	};
	const extensionIconUrl = extensionDetail.icons ? extensionDetail.icons[extensionDetail.icons.length - 1].url : '';
	return (
		<Box sx={{ width: '100%', maxHeight: '400px' }} className={classes.root}>
			<Box sx={{ my: 2, mx: 2 }}>
				<Grid container alignItems="center" spacing={2} sx={{ my: 2 }}>
					<Grid item>
						<Avatar
							sx={{ width: 48, height: 48, paddingTop: 0 }}
							alt={'extension'}
							src={extensionIconUrl}
							{...stringAvatar('extension')}
							className={`${enabled ? classes.enable : classes.disable}`}
						/>
					</Grid>
					<Grid item xs>
						<Typography gutterBottom variant="h6" component="div" style={{ paddingTop: 0 }}>
							{extensionDetail.name}
						</Typography>
					</Grid>
					<Grid item>
						{extensionDetail.type !== 'theme' ? (
							<Tooltip title={enabled ? 'Disable' : 'Enable'}>
								<Switch checked={enabled} onChange={handleChange} />
							</Tooltip>
						) : (
							<Tooltip title="Delete">
								<IconButton aria-label="delete" onClick={handleRemove} color="error">
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						)}
					</Grid>
				</Grid>
				<Typography color="text.secondary" variant="body2">
					{extensionDetail.description}
				</Typography>
			</Box>
			<Divider variant="middle" />
			<Box sx={{ m: 2 }}>
				<Typography gutterBottom variant="body1">
					Permissions:
				</Typography>
				<Stack direction="row" spacing={1} flexWrap="wrap-reverse">
					{extensionDetail.permissions.map((permission, index) => (
						<Chip key={index} color="primary" label={permission} style={{ margin: '2px' }} />
					))}
				</Stack>
			</Box>
			<Box sx={{ m: 2 }}>
				<Typography gutterBottom variant="body1">
					Version: {extensionDetail.version}
				</Typography>
			</Box>
		</Box>
	);
};
export default ExtensionDetail;
