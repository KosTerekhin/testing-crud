import React, { useEffect, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';

import HeroesContext from '../../state/superheroes/HeroesContext';
import API from '../../api/API';

import HeroElement from './heroElement/HeroElement';
import PageButtons from './pageButtons/PageButtons';

import Spinner from '../../assets/Spinner';

const ITEMS_PER_PAGE = 5;

const Main = ({ history, match: { params } }) => {
	const { error, fetchHeroes, allHeroes, currentHero, clearCurrentAndError, setError } = useContext(HeroesContext);
	const pageNumber = Number(params.pageNumber || 1);

	let heroList = null;
	allHeroes.length &&
		(heroList = allHeroes.map((hero) => (
			<HeroElement key={hero._id} id={hero._id} nickname={hero.nickname} images={hero.images} />
		)));

	useEffect(
		() => {
			if (!allHeroes.length || (error && error.status === 'resolved')) {
				// fetching heros if we dont have any yet
				API.superheroes
					.getAll()
					.then((res) => {
						fetchHeroes(res.data);
					})
					.catch((error) => {
						setError({
							msg: error.response.data
						});
					});

				clearCurrentAndError();
			}

			if (allHeroes.length) {
				// updating pages after we deleted / added a hero
				if (pageNumber < 1 || pageNumber > Math.ceil(heroList.length / ITEMS_PER_PAGE)) {
					history.push('/');
				}
			}

			// if we came from Hero's page -> clear state
			(currentHero || (error && error.msg)) && clearCurrentAndError();
		},
		// eslint-disable-next-line
		[ currentHero, allHeroes, error ]
	);

	return (
		<Container className="mt-5">
			<Row className="d-flex justify-content-around">
				{(() => {
					if (!heroList) return <Spinner />;

					const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
					let pageItems = heroList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
					return pageItems;
				})()}
			</Row>
			<PageButtons
				onPreviousClick={() => {
					if (pageNumber <= 1) return;

					history.push('/page-' + (pageNumber - 1));
				}}
				onNextClick={() => {
					if (pageNumber >= Math.ceil(heroList.length / ITEMS_PER_PAGE)) return;

					history.push('/page-' + (pageNumber + 1));
				}}
			/>
		</Container>
	);
};

export default Main;
