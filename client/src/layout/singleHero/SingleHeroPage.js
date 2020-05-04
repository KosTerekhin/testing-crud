import React, { useEffect, useContext, useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';

import HeroesContext from '../../state/superheroes/HeroesContext';
import API from '../../api/API';

import BioColumn from './bioColumn/BioColumn';
import ImgColumn from './imgColumn/ImgColumn';

import Spinner from '../../assets/Spinner';

const SingleHeroPage = (props) => {
	const {
		currentHero,
		findHero,
		error,
		updateHeroBio,
		deleteImages,
		updateHeroImg,
		deleteHero,
		setError,
		clearError
	} = useContext(HeroesContext);

	const [ spinner, setSpinner ] = useState(true);

	useEffect(
		() => {
			if (!currentHero && !error) {
				API.solohero
					.getOne(props.location.pathname.replace(/\/superhero\//, ''))
					.then((res) => {
						setSpinner(false);
						if (!res.data) {
							return setError({
								msg: 'Hero does not exist',
								btn: true,
								status: 'resolved'
							});
						}

						findHero(res.data);
					})
					.catch((error) => {
						setError({
							msg: error.response.data,
							btn: true
						});
						setSpinner(false);
					});
			}
		},
		// eslint-disable-next-line
		[ currentHero, error ]
	);

	// removing the entire hero -> DELETE req
	const handleDelete = async () => {
		setSpinner(true);

		try {
			const res = API.solohero.deleteOne(currentHero._id);
			deleteHero(res.data);
		} catch (error) {
			setError({
				msg: error.response.data
			});
		}
		setSpinner(false);
	};

	if (spinner) {
		return <Spinner />;
	} else {
		if (currentHero) {
			return (
				<Container className="mt-4">
					<Row>
						<ImgColumn
							currentHero={currentHero}
							updateHeroImg={updateHeroImg}
							deleteImages={deleteImages}
							setError={setError}
							clearError={clearError}
							error={error}
						/>
						<BioColumn
							currentHero={currentHero}
							error={error}
							updateHeroBio={updateHeroBio}
							deleteHero={deleteHero}
							setError={setError}
							clearError={clearError}
						/>
					</Row>
					<Row className="d-flex justify-content-start mb-4">
						<div className="d-flex mt-3">
							<Button variant="danger" onClick={handleDelete}>
								Delete Superhero
							</Button>
						</div>
					</Row>
				</Container>
			);
		} else {
			return null;
		}
	}
};

export default SingleHeroPage;
