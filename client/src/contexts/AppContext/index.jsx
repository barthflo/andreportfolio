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
		const slug = pathname.split('/').pop();
		await actions.getSingleFilmography(dispatch, slug);
		actions.initialize(dispatch);
	}, [dispatch, pathname]);

	useEffect(() => {
		if (pathname === '/' || pathname.includes('skills')) {
			homeInit();
		}
		if (pathname === '/filmography' || pathname === '/admin/filmography') {
			filmoListInit();
		}
		if (
			pathname.match(/filmography/gi) &&
			pathname !== '/filmography' &&
			pathname !== '/admin/filmography' &&
			pathname !== '/admin/filmography/create'
		) {
			filmoDetailInit();
		}
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (
			pathname === '/404' ||
			pathname === '/403' ||
			pathname === '/500' ||
			pathname === '/login' ||
			pathname.includes('admin')
		) {
			actions.initialize(dispatch);
		}
	}, [pathname]);

	// console.log(state);
	return (
		<AppContext.Provider value={{ state, dispatch, actions }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
