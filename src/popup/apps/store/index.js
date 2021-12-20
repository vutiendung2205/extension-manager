import { combineReducers } from '@reduxjs/toolkit';
import extensionsSlice from './extensionsSlice';

const reducer = combineReducers({
	extensions: extensionsSlice
});

export default reducer;
