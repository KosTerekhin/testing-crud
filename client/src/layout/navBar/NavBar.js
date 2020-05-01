import React from 'react';
import { withRouter } from 'react-router';
import { Button, Navbar, Form, Col } from 'react-bootstrap';

const NavBar = (props) => {
	return (
		<Navbar bg="dark" variant="dark" className="d-flex justify-content-between" md={8}>
			<Navbar.Brand href="#home" md={8} onClick={() => props.history.push('/')}>
				SUPERHEROES
			</Navbar.Brand>
			<Col className="d-flex justify-content-end" md={4}>
				<Form inline>
					<Button variant="light" onClick={() => props.history.push('/add')}>
						Add new SuperHero
					</Button>
				</Form>
				{/* <Form inline>
					<Button variant="outline-info">Load samples</Button>
				</Form> */}
			</Col>
		</Navbar>
	);
};

export default withRouter(NavBar);
