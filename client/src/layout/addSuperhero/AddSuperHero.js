import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Button, Form, Col } from 'react-bootstrap';

import HeroesContext from '../../state/superheroes/HeroesContext';
import API from '../../api/API';

import Spinner from '../../assets/Spinner';

const AddSuperHero = () => {
	const { currentHero, addNewHero, setError, clearError, clearCurrentAndError } = useContext(HeroesContext);

	const [ spinner, setSpinner ] = useState(false);
	const fileInput = React.createRef();

	const initState = {
		nickname: '',
		real_name: '',
		origin_description: '',
		superpowers: '',
		catch_phrase: ''
	};

	const [ inputs, setInputs ] = useState(initState);

	// clear state if we came from a different page
	useEffect(
		() => {
			currentHero && clearCurrentAndError();
		},
		// eslint-disable-next-line
		[ currentHero ]
	);

	// saving changes in bio
	const handleChange = (e) => {
		clearError();
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	// cancel changes -> resetting local state
	const handleCancelClick = () => {
		setInputs(initState);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSpinner(true);

		const validator = [];
		const arrayData = [ ...fileInput.current.files ];
		let formData = new FormData();

		// creating formData for out request and validating fields
		Object.keys(inputs).forEach((key) => {
			formData.append(`${key}`, inputs[key]);
			if (key === 'images' || key === '_id' || key === '__v') {
				return;
			} else {
				// validation
				if (!inputs[key].trim().length) {
					validator.push(key);
				}
			}
		});

		// checking for validation errors
		if (validator.length || !arrayData.length) {
			setError({
				msg: `Please select a photo and fill in all the fields: ${[ ...validator ]}`
			});

			return setSpinner(false);
		}

		// adding image into req
		arrayData.forEach((file) => {
			formData.append('images', file);
		});

		// sending POST to the the server -> adding new SH
		try {
			const res = await API.superheroes.add(formData);
			addNewHero(res.data);
			setError({
				msg: 'SuperHero added!',
				btn: true,
				status: 'resolved'
			});

			setInputs(initState);
		} catch (error) {
			setError({
				msg: error.response.data
			});
		}

		setSpinner(false);
	};

	return spinner ? (
		<Spinner />
	) : (
		<Container className="mt-4" md={6}>
			<Row className="d-flex flex-column justify-content-center">
				<Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
					{Object.keys(inputs).map((item, index) => (
						<Form.Row key={item + index}>
							<Form.Group as={Col}>
								<Form.Label>{item}</Form.Label>
								<Form.Control
									type="text"
									placeholder={inputs[item]}
									name={`${item}`}
									value={inputs[item]}
									onChange={handleChange}
								/>
							</Form.Group>
						</Form.Row>
					))}
					<label className="mt-4">Add profile photo</label>
					<input type="file" ref={fileInput} />
					<div className="d-flex justify-content-start mt-4">
						<Button type="submit" variant="success">
							Add hero
						</Button>
						<Button variant="secondary" className="ml-5" onClick={handleCancelClick}>
							Cancel/Clear
						</Button>
					</div>
				</Form>
			</Row>
		</Container>
	);
};

export default AddSuperHero;
