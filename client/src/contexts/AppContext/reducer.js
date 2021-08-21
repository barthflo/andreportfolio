import axios from 'axios';

export const initialState = {
	home: null,
	filmographyList: null,
	filmographyItem: null,
	siteSettings: null,
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
		}
	},
	getHomePageDatas: async (dispatch) => {
		try {
			const {
				data: { video },
			} = await axios.get(`/api/intro?category=intro`);
			const {
				data: { about },
			} = await axios.get(`/api/about?category=about&size=large`);
			const {
				data: { filmography },
			} = await axios.get(`/api/filmography?limit=3`);

			dispatch({
				type: 'GET_HOME_DATAS',
				payload: {
					video,
					about,
					filmography,
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
		const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
		const { data } = res;
		dispatch({
			type: 'GET_MULTIPLE_FILMOGRAPHY',
			payload: data,
		});
	},
	getSingleFilmography: async (dispatch) => {
		const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
		const { data } = res;
		dispatch({
			type: 'GET_SINGLE_FILMOGRAPHY',
			payload: data,
		});
	},
};
