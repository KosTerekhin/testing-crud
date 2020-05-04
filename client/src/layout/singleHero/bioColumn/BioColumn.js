import React, { useState, useEffect } from 'react';
import { Col, Button, Form } from 'react-bootstrap';

import API from '../../../api/API';

import Spinner from '../../../assets/Spinner';

const BioColumn = ({ currentHero, updateHeroBio, setError, clearError }) => {
	const [ inputs, setInputs ] = useState(currentHero);
	const [ spinner, setSpinner ] = useState(false);
	const [ disabledBtn, setdisabledBtn ] = useState(true);

	// looking for changes in bio
	const handleChange = (e) => {
		clearError();
		setInputs({ ...inputs, [e.target.name]: e.target.value });
		setdisabledBtn(false);
	};

	// cancel chages -> resetting local state
	const handleCancelClick = () => {
		setInputs(currentHero);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSpinner(true);
		setdisabledBtn(true);

		// sending PUT to the the server
		// creating body
		const validator = [];
		const newObj = {};
		Object.keys(inputs).forEach((key) => {
			if (key === 'images' || key === '_id' || key === '__v') {
				return;
			} else {
				// creating body
				newObj[key] = inputs[key];
				// validation
				if (inputs[key].trim().length < 1) {
					validator.push(key);
				}
			}
		});

		// validation
		if (validator.length) {
			setError({
				msg: `Please fill in all the fields: ${[ ...validator ]}`
			});
			return setSpinner(false);
		}

		try {
			const res = await API.solohero.updateBio(inputs._id, newObj);
			updateHeroBio(res.data);
			setError({
				msg: 'SuperHero updated!',
				status: 'resolved'
			});
		} catch (error) {
			setError({
				msg: error.response.data
			});
		}
		setSpinner(false);
	};

	useEffect(
		() => {
			setInputs(currentHero);
		},
		[ currentHero ]
	);

	if (!spinner) {
		if (!currentHero) {
			return null;
		} else {
			return (
				<Col md={6}>
					<Form onSubmit={handleSubmit}>
						{Object.keys(inputs).map((item, index) => {
							if (item === '_id' || item === '__v' || item === 'images') {
								return null;
							} else {
								return (
									<Form.Row key={item + index}>
										<Form.Group as={Col} md="12">
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
								);
							}
						})}

						<div className="d-flex justify-content-around">
							<Button type="submit" variant="success" disabled={disabledBtn}>
								Submit changes
							</Button>
							<Button variant="secondary" disabled={disabledBtn} onClick={handleCancelClick}>
								Cancel changes
							</Button>
						</div>
					</Form>
				</Col>
			);
		}
	} else {
		return <Spinner />;
	}
};

export default BioColumn;
