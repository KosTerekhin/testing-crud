import React, { useState } from 'react';
import { Col, Button, Form, Image, Row } from 'react-bootstrap';

import API from '../../../api/API';
import Spinner from '../../../assets/Spinner';

const ImgColumn = ({ currentHero, updateHeroImg, deleteImages, setError, clearError }) => {
	const fileInput = React.createRef();
	const [ disabledBtn, setdisabledBtn ] = useState(true);
	const [ imgDeleteList, setImgDeleteList ] = useState([]);
	const [ spinner, setSpinner ] = useState(false);

	const handleInputChange = () => {
		clearError();
		fileInput.current.files.length && setdisabledBtn(false);
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		setdisabledBtn(true);
		setSpinner(true);
		// creating req.body
		let arrayData = [ ...fileInput.current.files ];
		var formData = new FormData();
		arrayData.forEach((file) => {
			formData.append('images', file);
		});
		try {
			const res = await API.images.addImages(currentHero._id, formData);
			updateHeroImg(res.data);
			setError({
				msg: 'Pictures added',
				status: 'resolved'
			});
		} catch (error) {
			setError({
				msg: error.response.data
			});
		}
		setSpinner(false);
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		setSpinner(true);

		try {
			const res = await API.images.deleteImages(currentHero._id, imgDeleteList);
			deleteImages(res.data);

			setError({
				msg: 'Deleted',
				status: 'resolved'
			});
		} catch (error) {
			setError({
				msg: error.response.data
			});
		}
		setSpinner(false);
		setImgDeleteList([]);
	};

	if (!spinner) {
		if (!currentHero) {
			return null;
		} else {
			return (
				<Col md={6}>
					{/* UPLOAD FORM */}
					<Row className="pb-4" style={{ borderBottom: '1px solid black' }}>
						<Form
							onSubmit={handleUpload}
							style={{ width: '100%' }}
							className="d-flex flex-column justify-content-center"
						>
							<h3>Image Upload</h3>
							<input type="file" ref={fileInput} multiple onChange={handleInputChange} />

							<Button type="submit" className="mt-4" disabled={disabledBtn}>
								Upload pictures
							</Button>
						</Form>
					</Row>
					{/* DELETE FORM */}
					<Row
						className="d-flex justify-content-between mt-3 pb-4"
						style={{ borderBottom: '1px solid black' }}
					>
						<h4>Click on a photo to delete</h4>
						<Form onSubmit={handleDelete} style={{ width: '100%' }} className="d-flex flex-column">
							<div className="d-flex justify-content-around mt-4 mb-4">
								<Button type="submit" variant="warning" disabled={!imgDeleteList.length}>
									Confirm delete
								</Button>
								<Button
									variant="secondary"
									onClick={() => {
										setImgDeleteList([]);
									}}
									disabled={!imgDeleteList.length}
								>
									Cancel delete
								</Button>
							</div>
							<div className="d-flex flex-wrap justify-content-between align-items-center">
								{currentHero.images[0] ? (
									currentHero.images.map((img, i) => {
										return (
											<div
												style={{
													maxWidth: '45%',
													cursor: 'pointer'
												}}
												key={img.id + i}
											>
												<Image
													src={img.url}
													style={
														imgDeleteList.indexOf(img.id) === -1 ? (
															{
																maxWidth: '100%',
																border: '1px solid gray'
															}
														) : (
															{
																maxWidth: '100%',
																border: '2px solid crimson',
																opacity: '0.5'
															}
														)
													}
													rounded
													className="mt-2"
													onClick={() => {
														imgDeleteList.indexOf(img) === -1 &&
															setImgDeleteList([ ...imgDeleteList, img.id ]);
													}}
												/>
											</div>
										);
									})
								) : null}
							</div>
						</Form>
					</Row>
				</Col>
			);
		}
	} else {
		return <Spinner />;
	}
};

export default ImgColumn;
