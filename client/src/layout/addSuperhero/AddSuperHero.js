import React, { useContext, useState } from 'react';
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
	currentHero && clearCurrentAndError();

	// saving changes in bio
	const handleChange = (e) => {
		clearError();
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	// cancel changes -> resetting local state
	const handleCancelClick = () => {
		setInputs(initState);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const validator = [];
		let arrayData = [ ...fileInput.current.files ];
		let formData = new FormData();

		Object.keys(inputs).forEach((key) => {
			// adding hero's BIO into req
			formData.append(`${key}`, inputs[key]);

			if (key === 'images' || key === '_id' || key === '__v') {
				return;
			} else {
				// validation
				if (inputs[key].trim().length < 1) {
					validator.push(key);
				}
			}
		});

		// validation error
		if (validator.length || !arrayData.length) {
			setError({
				msg: `Please select a photo and fill in all the fields: ${[ ...validator ]}`
			});
			setSpinner(false);
			return;
		}

		// adding image into req
		arrayData.forEach((file) => {
			formData.append('images', file);
		});

		// sending POST to the the server -> adding new SH
		setSpinner(true);
		API.superheroes
			.add(formData)
			.then((res) => {
				addNewHero(res.data);
				setError({
					msg: 'SuperHero added!',
					btn: true,
					status: 'resolved'
				});

				setInputs(initState);
			})
			.catch((error) => {
				setError({
					msg: error.response.data
				});
				throw error;
			});
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
