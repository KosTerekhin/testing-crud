import React, { useContext } from 'react';
import { Alert, Button } from 'react-bootstrap';

import { withRouter } from 'react-router-dom';

import HeroesContext from '../state/superheroes/HeroesContext';

const Errors = (props) => {
	const { error } = useContext(HeroesContext);
	const goHomeFunc = () => {
		props.history.push('/');
	};

	let style = 'danger';

	if (error && error.status === 'resolved') {
		style = 'success';
	}

	return error ? (
		<Alert variant={style}>
			<div className="d-flex justify-content-center">
				<Alert.Heading>{error.msg}</Alert.Heading>
			</div>

			{error.btn ? (
				<div className="d-flex justify-content-center mt-4">
					<Button variant="dark" onClick={goHomeFunc}>
						Go Home
					</Button>
				</div>
			) : null}
		</Alert>
	) : null;
};

export default withRouter(Errors);
