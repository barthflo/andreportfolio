import React, { createContext, useEffect, useReducer } from 'react';
import { reducer, actions } from './reducer';
import Cookies from 'js-cookie';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, null);

	const accessToken = Cookies.get('accessToken');

	// console.log(state);
	useEffect(() => {
		if (accessToken) {
			dispatch({
				type: 'LOGIN',
				payload: {
					user: JSON.parse(localStorage.getItem('user')),
					isAuthenticated: true,
				},
			});
		} else {
			localStorage.removeItem('user');
			dispatch({
				type: 'INITIALIZE',
			});
		}
	}, [accessToken]);
	if (!state) return null;

	return (
		<AuthContext.Provider value={{ state, dispatch, actions }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
