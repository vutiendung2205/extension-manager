/* global chrome */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const extensionsSlice = createSlice({
	name: 'extensions',
	initialState: [],
	reducers: {
		getExtensions: (state, action) => {
			return action.payload;
		},
		changeStatusExtension: (state, action) => {
			const extensionId = action.payload;
			const newExtensions = [...state].map(extension => {
				if (extension.id == extensionId) {
					return { ...extension, enabled: !extension.enabled };
				} else {
					return extension;
				}
			});
			return newExtensions;
		},
		removeExtension: (state, action) => {
			const extensionId = action.payload;
			const newExtensions = [...state].filter(extension => extension.id != extensionId);
			return newExtensions;
		}
	},
	extraReducers: {}
});

export const { getExtensions, changeStatusExtension, removeExtension } = extensionsSlice.actions;

export default extensionsSlice.reducer;
