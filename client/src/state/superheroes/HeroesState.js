import React, { useReducer } from 'react';
import HeroesContext from './HeroesContext';
import HeroesReducer from './HeroesReducer';

const HeroesState = (props) => {
	const initialState = {
		allHeroes: {},
		currentHero: null,
		error: null
	};
	const [ state, dispatch ] = useReducer(HeroesReducer, initialState);

	const fetchHeroes = (heroes) => {
		dispatch({
			type: 'GET_HEROES',
			payload: heroes
		});
	};

	const findHero = (hero) => {
		dispatch({
			type: 'HERO_FOUND',
			payload: hero
		});
	};

	const addNewHero = (hero) => {
		dispatch({
			type: 'ADD_NEW_HERO',
			payload: hero
		});
	};

	const updateHeroBio = (hero) => {
		dispatch({
			type: 'UPDATE_HERO_BIO',
			payload: hero
		});
	};

	const updateHeroImg = (links) => {
		dispatch({
			type: 'UPDATE_HERO_IMG',
			payload: links
		});
	};

	const deleteImages = (images) => {
		dispatch({
			type: 'DELETE_HERO_IMG',
			payload: images
		});
	};

	const deleteHero = (id) => {
		dispatch({
			type: 'DELETE_HERO',
			payload: id
		});
	};

	const setError = (error) => {
		dispatch({
			type: 'SET_ERROR',
			payload: error
		});
	};

	const clearError = () => {
		dispatch({
			type: 'CLEAR_ERROR'
		});
	};

	const clearCurrentAndError = () => {
		dispatch({
			type: 'CLEAR_STATE'
		});
	};

	return (
		<HeroesContext.Provider
			value={{
				allHeroes: state.allHeroes,
				currentHero: state.currentHero,
				error: state.error,
				fetchHeroes,
				findHero,
				updateHeroBio,
				updateHeroImg,
				addNewHero,
				deleteImages,
				deleteHero,
				setError,
				clearError,
				clearCurrentAndError
			}}
		>
			{props.children}
		</HeroesContext.Provider>
	);
};

export default HeroesState;
