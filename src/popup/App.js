import { createGenerateClassName, jssPreset, StylesProvider } from '@mui/styles';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import AppContext from './AppContext';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import reducer from './apps/store';
import withReducer from 'popup/store/withReducer';
import PopupApp from './apps';
const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName();

const App = () => {
	return (
		<AppContext.Provider value={{}}>
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<PopupApp />
					</PersistGate>
				</Provider>
			</StylesProvider>
		</AppContext.Provider>
	);
};

export default withReducer('App', reducer)(App);
