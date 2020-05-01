import React, { Fragment, useState } from 'react';
import { Col, Button, Form, Image, Row } from 'react-bootstrap';
import API from '../../../api/API';

import Spinner from '../../../assets/Spinner';

const ImgColumn = (props) => {
	const { currentHero, updateHeroImg, deleteImages, setError, clearError } = props;

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

		API.images
			.addImages(currentHero._id, formData)
			.then((res) => {
				updateHeroImg(res.data);
				setError({
					msg: 'Pictures added',
					status: 'resolved'
				});
				setSpinner(false);
			})
			.catch((error) => {
				setError({
					msg: error.response.data
				});
				setSpinner(false);
			});
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		setSpinner(true);

		// creating req
		API.images
			.deleteImages(currentHero._id, imgDeleteList)
			.then((res) => {
				deleteImages(res.data);

				setError({
					msg: 'Deleted',
					status: 'resolved'
				});
				setSpinner(false);
			})
			.catch((error) => {
				setError({
					msg: error.response.data
				});
				setSpinner(false);
			});
	};

	if (!spinner) {
		if (!currentHero) {
			return null;
		} else {
			return (
				<Fragment>
					<Col md={6}>
						{/* UPLOAD FORM */}
						<Row>
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
						<Row className="d-flex justify-content-between mt-5">
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
								<div className="d-flex flex-wrap justify-content-between">
									{currentHero.images[0] ? (
										currentHero.images.map((img) => {
											return (
												<Image
													src={img}
													key={img}
													rounded
													style={
														imgDeleteList.indexOf(img) === -1 ? (
															{
																maxWidth: '45%',
																border: '1px solid black',
																cursor: 'pointer'
															}
														) : (
															{
																maxWidth: '45%',
																border: '3px solid crimson',
																cursor: 'pointer'
															}
														)
													}
													className="mt-2"
													onClick={() => {
														imgDeleteList.indexOf(img) === -1 &&
															setImgDeleteList([ ...imgDeleteList, img ]);
													}}
												/>
											);
										})
									) : null}
								</div>
							</Form>
						</Row>
					</Col>
				</Fragment>
			);
		}
	} else {
		return <Spinner />;
	}
};

export default ImgColumn;
