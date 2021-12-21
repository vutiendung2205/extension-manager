/* global chrome */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
	name: 'settings',
	initialState: {
		view: 'viewList',
		page: 'pageView',
		detailId: '',
		search: '',
		type: 'all'
	},
	reducers: {
		changeView: (state, action) => {
			state.view = action.payload;
		},
		setDetailId: (state, action) => {
			state.detailId = action.payload;
		},
		getSearchKey: (state, action) => {
			state.search = action.payload;
		},
		getType: (state, action) => {
			state.type = action.payload;
		}
	},
	extraReducers: {}
});

export const { changeView, setDetailId, getSearchKey, getType } = settingsSlice.actions;

export default settingsSlice.reducer;
