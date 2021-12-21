import { combineReducers } from '@reduxjs/toolkit';
import extensionsSlice from './extensionsSlice';
import settingsSlice from './settingsSlice';

const reducer = combineReducers({
	extensions: extensionsSlice,
	settings: settingsSlice
});

export default reducer;
