import React from 'react';
import { Alert, Button } from 'react-bootstrap';

import { withRouter } from 'react-router-dom';

const NoMatch = (props) => {
	return (
		<Alert>
			<div className="d-flex flex-column justify-content-center alight-items-center">
				<h1>Page Not Found - 404</h1>
				<Button
					variant="dark"
					onClick={() => {
						props.history.push('/');
					}}
				>
					Go Home
				</Button>
			</div>
		</Alert>
	);
};

export default withRouter(NoMatch);
