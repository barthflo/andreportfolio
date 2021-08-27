import axios from 'axios';
import Cookies from 'js-cookie';

export const initialState = {
	user: null,
	isAuthenticated: false,
	error: null,
};

export const reducer = (state, action) => {
	const { payload, type } = action;
	switch (type) {
		case 'INITIALIZE':
			return initialState;
		case 'LOGIN':
			return {
				...state,
				user: payload.user,
				// isAuthenticated: payload.isAuthenticated,
			};
		case 'VERIFY':
			return {
				...state,
				isAuthenticated: payload.isAuthenticated,
				user: payload.user,
			};
		case 'LOGOUT':
			return {
				...state,
				user: payload.user,
				isAuthenticated: payload.isAuthenticated,
			};
		case 'ERROR':
			return {
				...state,
				error: payload.error,
			};
		default:
			throw new Error('No action found to update the store');
	}
};

export const actions = {
	login: async (dispatch, data) => {
		try {
			const res = await axios.post('/api/auth/login', data, {
				withCredentials: true,
			});
			const {
				data: { user },
				status,
			} = res;

			if (status === 204) {
				return {
					error: { email: 'Email address not found' },
				};
			}
			localStorage.setItem('user', JSON.stringify(user));
			dispatch({
				type: 'LOGIN',
				payload: {
					user,
				},
			});
		} catch (err) {
			console.error(err);
			if (err.response.status === 401) {
				return { error: { password: err.response.data } };
			} else {
				dispatch({
					type: 'ERROR',
					payload: {
						error: err.response,
					},
				});
			}
		}
	},
	verify: async (dispatch) => {
		try {
			const res = await axios.get('/api/auth');
			const { isAuthenticated } = res.data;
			dispatch({
				type: 'VERIFY',
				payload: {
					isAuthenticated,
					user: JSON.parse(localStorage.getItem('user')),
				},
			});
		} catch (err) {
			console.error(err);
			dispatch({
				type: 'ERROR',
				payload: {
					error: err.response,
				},
			});
			Cookies.remove('accessToken');
		}
	},
	logout: (dispatch) => {
		dispatch({
			type: 'LOGOUT',
			payload: {
				user: null,
				isAuthenticated: false,
			},
		});
		Cookies.remove('accessToken');
		localStorage.removeItem('user');
	},
};
