import axios from 'axios';

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
				isAuthenticated: payload.isAuthenticated,
			};
		case 'LOGOUT':
			return {
				...state,
				payload,
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
				credentials: 'include',
			});
			const { user, isAuthenticated } = res.data;
			localStorage.setItem('user', JSON.stringify(user));
			dispatch({
				type: 'LOGIN',
				payload: {
					user,
					isAuthenticated,
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
	},
};
