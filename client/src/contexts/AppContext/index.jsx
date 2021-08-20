import React, {
	createContext,
	useEffect,
	useReducer,
	useCallback,
} from 'react';
import { useLocation } from 'react-router-dom';
import { reducer, actions, initialState } from './reducer';

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
	const { pathname } = useLocation();

	const [state, dispatch] = useReducer(reducer, initialState);

	const homeInit = useCallback(async () => {
		await actions.getHomePageDatas(dispatch);
		actions.initialize(dispatch);
	}, [dispatch]);

	const filmoListInit = useCallback(async () => {
		await actions.getMultipleFilmography(dispatch);
		actions.initialize(dispatch);
	}, [dispatch]);

	const filmoDetailInit = useCallback(async () => {
		await actions.getSingleFilmography(dispatch);
		actions.initialize(dispatch);
	}, [dispatch]);

	useEffect(() => {
		if (pathname === '/') {
			homeInit();
		}
		if (pathname === '/filmography') {
			filmoListInit();
		}
		if (pathname.match(/filmography/gi)) {
			filmoDetailInit();
		}
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (pathname === '/404') {
			actions.initialize(dispatch);
		}
	}, [pathname]);

	console.log(state);
	console.log(process.env);
	return (
		<AppContext.Provider value={{ state, dispatch, actions }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
