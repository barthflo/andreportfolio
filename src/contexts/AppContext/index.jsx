import React, { createContext, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { reducer, actions, initialState } from './reducer';

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
	const { pathname } = useLocation();

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		let timeout;
		if (pathname === '/') {
			timeout = setTimeout(() => actions.getHomePageDatas(dispatch), 2000);
			return;
		}
		if (pathname === '/filmography') {
			actions.getMultipleFilmography(dispatch);
			return;
		}
		if (pathname.match(/filmography/gi)) {
			actions.getSingleFilmography(dispatch);
			return;
		}
		// if (pathname === '/404') {
		// 	actions.initialize(dispatch);
		// }
		return () => clearTimeout(timeout);
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (pathname === '/404') {
			actions.initialize(dispatch);
		}
	}, [pathname]);
	console.log(state);

	return (
		<AppContext.Provider value={{ state, dispatch, actions }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
