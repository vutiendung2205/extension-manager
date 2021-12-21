import { Box, Typography } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useDispatch, useSelector } from 'react-redux';
import { changeView } from '../store/settingsSlice';

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#f7f7f7',
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
	},
	Typography: {
		textAlign: 'center',
		margin: 'auto',
		lineHeight: '50px'
	},
	buttonGroup: {
		position: 'fixed',
		margin: '6px',
		right: 0,
		'&::hover': {
			outline: 'none',
			border: 'none'
		},
		'&::focus': {
			outline: 'none',
			border: 'none'
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
	}
}));
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	'& .MuiToggleButtonGroup-grouped': {
		border: 0,
		'&.Mui-disabled': {
			border: 0
		},
		'&:not(:first-of-type)': {
			borderRadius: theme.shape.borderRadius
		},
		'&:first-of-type': {
			borderRadius: theme.shape.borderRadius
		}
	}
}));
const Header = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { view } = useSelector(state => state.App.settings);

	const handleChange = (event, nextView) => {
		dispatch(changeView(nextView));
	};
	return (
		<React.Fragment>
			<Box sx={{ width: '100%', height: '50px' }} className={classes.root}>
				<Typography variant="h6" sx={{ lineHeight: '50px' }} className={classes.Typography}>
					Extension Manager
				</Typography>
				<StyledToggleButtonGroup
					size="small"
					value={view}
					exclusive
					onChange={handleChange}
					aria-label="view"
					className={classes.buttonGroup}
				>
					<ToggleButton value="viewList" aria-label="viewList" className={classes.noBorder}>
						<ViewListIcon />
					</ToggleButton>
					<ToggleButton value="viewModule" aria-label="viewModule" className={classes.noBorder}>
						<ViewModuleIcon />
					</ToggleButton>
				</StyledToggleButtonGroup>
			</Box>
		</React.Fragment>
	);
};
export default Header;
