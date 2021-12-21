/* global chrome */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
	name: 'settings',
	initialState: {
		view: 'viewList'
	},
	reducers: {
		changeView: (state, action) => {
			state.view = action.payload;
		}
	},
	extraReducers: {}
});

export const { changeView } = settingsSlice.actions;

export default settingsSlice.reducer;
