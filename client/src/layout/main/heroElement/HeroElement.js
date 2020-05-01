import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { withRouter } from 'react-router';

import defaultImg from '../../../assets/images/default.png';

const HeroElement = (props) => {
	const { nickname, id, images } = props;
	const handleClick = () => {
		props.history.push(`/superhero/${id}`);
	};

	// setting main photo
	let src = defaultImg;
	images[0] && (src = images[0]);

	return (
		<Card style={{ width: '29%' }} className="mb-4">
			<Card.Img
				variant="top"
				src={src}
				style={{
					objectFit: 'contain',
					objectPosition: '50% 0%',
					maxHeight: '200px'
				}}
			/>
			<Card.Body className="d-flex flex-column justify-content-center">
				<Card.Title style={{ textAlign: 'center' }}>{nickname}</Card.Title>
				<Button variant="primary" onClick={handleClick}>
					View more
				</Button>
			</Card.Body>
		</Card>
	);
};

export default withRouter(HeroElement);
