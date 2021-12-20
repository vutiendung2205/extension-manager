/* global chrome */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './main/Header';
import { makeStyles } from '@mui/styles';
import Content from './main/Content';
import { getExtensions } from './store/extensionsSlice';
const useStyles = makeStyles(theme => ({
	root: {
		width: '480px',
		height: '450px',
		overflow: 'hidden'
	},
	loading: {
		width: '480px',
		height: '450px',
		margin: 'auto',
		display: 'flex'
	},
	CircularProgress: {
		margin: 'auto'
	}
}));
const PopupApp = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		chrome.management.getAll(extension => {
			dispatch(getExtensions(extension));
		});
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);
	if (isLoading) {
		return (
			<div className={classes.loading}>
				<CircularProgress disableShrink className={classes.CircularProgress} />
			</div>
		);
	}

	return (
		<div className={classes.root}>
			<Header />
			<Content />
		</div>
	);
};
export default PopupApp;
