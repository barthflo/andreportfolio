import axios from 'axios';

export const initialState = {
	home: null,
	filmographyList: null,
	filmographyItem: null,
	siteSettings: null,
	messages: null,
	error: null,
	initialized: false,
};

export const reducer = (state, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'INITIALIZE':
			return {
				...state,
				siteSettings: payload,
				initialized: true,
			};
		case 'GET_HOME_DATAS':
			return {
				...state,
				home: payload,
			};
		case 'GET_MULTIPLE_FILMOGRAPHY':
			return {
				...state,
				filmographyList: payload,
			};
		case 'GET_SINGLE_FILMOGRAPHY':
			return {
				...state,
				filmographyItem: payload,
			};
		case 'RESET_FILM_DETAIL':
			return {
				...state,
				filmographyItem: null,
			};
		case 'GET_MESSAGES':
			return {
				...state,
				messages: payload.messages,
			};
		case 'ERROR':
			return {
				...state,
				error: payload,
				initialized: false,
			};
		default:
			return new Error('No action found to update the store');
	}
};

export const actions = {
	initialize: async (dispatch) => {
		try {
			const res = await axios.get(`/api/settings?user=owner`);
			const {
				data: { siteSettings },
			} = res;

			dispatch({
				type: 'INITIALIZE',
				payload: siteSettings,
			});
		} catch (err) {
			console.error(err);
			dispatch({ type: 'ERROR', payload: err.response });
		}
	},
	getHomePageDatas: async (dispatch) => {
		try {
			const {
				data: { video, picture, id },
			} = await axios.get(`/api/intro?category=intro`);
			const {
				data: { about },
			} = await axios.get(`/api/about`);
			const {
				data: { filmography },
			} = await axios.get(`/api/filmography?limit=6`);
			const {
				data: { skills, cv },
			} = await axios.get('/api/skills?category=cv');
			dispatch({
				type: 'GET_HOME_DATAS',
				payload: {
					video: { video, picture, id },
					about,
					filmography,
					skills,
					cv,
				},
			});
		} catch (err) {
			console.error(err);
			dispatch({
				type: 'ERROR',
				payload: err.response,
			});
		}
	},
	getMultipleFilmography: async (dispatch) => {
		try {
			const res = await axios.get('/api/filmography');
			const {
				data: { filmography },
			} = res;
			dispatch({
				type: 'GET_MULTIPLE_FILMOGRAPHY',
				payload: filmography,
			});
		} catch (err) {
			console.error(err);
			dispatch({
				type: 'ERROR',
				payload: err.response,
			});
		}
	},
	getSingleFilmography: async (dispatch, slug) => {
		try {
			const res = await axios.get('/api/filmography/' + slug);
			const { data: film } = res;
			dispatch({
				type: 'GET_SINGLE_FILMOGRAPHY',
				payload: film,
			});
		} catch (err) {
			console.error(err);
			dispatch({
				type: 'ERROR',
				payload: err.response,
			});
		}
	},
	getMessages: async (dispatch, query) => {
		try {
			const res = await axios.get('/api/messages' + query);
			const { data: messages } = res;
			dispatch({
				type: 'GET_MESSAGES',
				payload: messages,
			});
		} catch (err) {
			console.error(err);
		}
	},
};
