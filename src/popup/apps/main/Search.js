import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { getSearchKey, getType } from '../store/settingsSlice';
const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		padding: '10px',
		height: '80px'
		// backgroundColor: '#FBFFE2'
	}
}));
const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));
const Search = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { search, type } = useSelector(state => state.App.settings);

	const handleChange = event => {
		dispatch(getType(event.target.value));
	};
	const handleSearch = event => {
		dispatch(getSearchKey(event.target.value.toLowerCase()));
	};

	return (
		<Box sx={{ width: '100%' }} className={classes.root}>
			<Grid container spacing="5px">
				<Grid item xs={8}>
					<FormControl fullWidth>
						<TextField label="Search..." value={search} variant="outlined" onChange={handleSearch} />
					</FormControl>
				</Grid>
				<Grid item xs={4}>
					<FormControl fullWidth>
						<InputLabel>Type</InputLabel>
						<Select value={type} label="Type" onChange={handleChange}>
							<MenuItem value="all">All</MenuItem>
							<MenuItem value="extension">Extension</MenuItem>
							<MenuItem value="legacy_packaged_app">Chrome Apps</MenuItem>
							<MenuItem value="theme">Theme</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</Box>
	);
};
export default Search;
