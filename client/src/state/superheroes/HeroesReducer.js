export default (state, action) => {
	switch (action.type) {
		case 'GET_HEROES': {
			return {
				...state,
				allHeroes: action.payload
			};
		}

		case 'HERO_FOUND': {
			return {
				...state,
				currentHero: action.payload
			};
		}

		case 'ADD_NEW_HERO': {
			if (state.allHeroes.length) {
				return {
					...state,
					allHeroes: [ action.payload, ...state.allHeroes ]
				};
			} else {
				return {
					...state,
					allHeroes: action.payload
				};
			}
		}

		case 'UPDATE_HERO_BIO': {
			if (state.allHeroes.length) {
				return {
					...state,
					allHeroes: state.allHeroes.map((item) => {
						if (item._id === action.payload._id) {
							return action.payload;
						} else {
							return item;
						}
					}),
					currentHero: action.payload
				};
			} else
				return {
					...state,
					currentHero: action.payload
				};
		}

		case 'UPDATE_HERO_IMG': {
			return {
				...state,
				currentHero: {
					...state.currentHero,
					images: action.payload
				}
			};
		}

		case 'DELETE_HERO_IMG': {
			return {
				...state,
				currentHero: {
					...state.currentHero,
					images: action.payload
				}
			};
		}

		case 'DELETE_HERO': {
			if (state.allHeroes.length) {
				return {
					...state,
					allHeroes: state.allHeroes.filter((item) => item._id !== action.payload),
					currentHero: null,
					error: {
						msg: 'SuperHero removed',
						btn: true,
						status: 'resolved'
					}
				};
			} else {
				return {
					...state,
					currentHero: null,
					error: {
						msg: 'SuperHero removed',
						btn: true,
						status: 'resolved'
					}
				};
			}
		}

		case 'SET_ERROR': {
			return {
				...state,
				error: action.payload
			};
		}

		case 'CLEAR_ERROR': {
			return {
				...state,
				error: null
			};
		}

		case 'CLEAR_STATE': {
			return {
				...state,
				currentHero: null,
				error: null
			};
		}

		default: {
			return state;
		}
	}
};
