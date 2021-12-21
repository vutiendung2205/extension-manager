/* global chrome */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
	name: 'settings',
	initialState: {
		view: 'viewList',
		page: 'pageView',
		detailId: ''
	},
	reducers: {
		changeView: (state, action) => {
			state.view = action.payload;
		},
		setDetailId: (state, action) => {
			state.detailId = action.payload;
		}
	},
	extraReducers: {}
});

export const { changeView, setDetailId } = settingsSlice.actions;

export default settingsSlice.reducer;
