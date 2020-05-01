import React from 'react';
import { Row, Button } from 'react-bootstrap';

const PageButtons = ({ onPreviousClick, onNextClick }) => {
	return (
		<Row className="mt-5 dflex justify-content-center">
			<Button variant="secondary" className="mr-1" size="lg" onClick={onPreviousClick}>
				Previous
			</Button>
			<Button variant="primary" className="ml-1" size="lg" onClick={onNextClick}>
				Next
			</Button>
		</Row>
	);
};

export default PageButtons;
