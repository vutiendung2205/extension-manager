import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createReducer from './rootReducer';
import thunk from 'redux-thunk';
import getStoredState from 'redux-persist/es/getStoredState';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // d

// if (process.env.NODE_ENV === 'development' && module.hot) {
// 	module.hot.accept('./rootReducer', () => {
// 		const newRootReducer = require('./rootReducer').default;
// 		store.replaceReducer(newRootReducer.createReducer());
// 	});
// }
const persistConfig = {
	key: 'root',
	storage,
	debug: true
};
const persistedReducer = persistReducer(persistConfig, createReducer());

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		if (process.env.NODE_ENV === 'development') {
			const { logger } = require(`redux-logger`);

			return getDefaultMiddleware({ serializableCheck: false }).concat(logger);
		}

		return getDefaultMiddleware({ serializableCheck: false });
	},
	devTools: process.env.NODE_ENV === 'development'
});

store.asyncReducers = {};

export const persistor = persistStore(store, null, () => {
	// if you want to get restoredState
	// console.log('restoredState', store.getState());
});
export const injectReducer = (key, reducer) => {
	if (store.asyncReducers[key]) {
		return false;
	}
	store.asyncReducers[key] = reducer;
	store.replaceReducer(persistReducer(persistConfig, createReducer(store.asyncReducers)));

	persistor.persist();
	getStoredState(persistConfig).then(storedState => {
		store.dispatch({
			type: REHYDRATE,
			key: persistConfig.key,
			err: undefined,
			payload: storedState
		});
	});
	// console.log('persistor.persist():', persistor.persist());
	// console.log(store.asyncReducers);
	return store;
};
export default store;
