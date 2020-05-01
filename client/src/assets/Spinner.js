import React from 'react';
import { Col } from 'react-bootstrap';
import SpinnerGif from './images/spinner.gif';

const Spinner = () => {
	return (
		<Col md={6} className="d-flex align-items-center justify-content-center">
			<img src={SpinnerGif} alt="spinner" className="Spinner" />
		</Col>
	);
};

export default Spinner;
