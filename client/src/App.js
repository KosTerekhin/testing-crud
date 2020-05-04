import './styles/App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HeroesState from './state/superheroes/HeroesState';

import NavBar from './layout/navBar/NavBar';
import Main from './layout/main/Main';
import SingleHeroPage from './layout/singleHero/SingleHeroPage';
import AddSuperHero from './layout/addSuperhero/AddSuperHero';

import NoMatch from './assets/NoMatch';
import Errors from './assets/Errors';

function App() {
	return (
		<HeroesState>
			<Router>
				<Fragment>
					<NavBar />
					<Errors />
					<Switch>
						<Route exact path="/" component={Main} />
						<Route exact path="/page-:pageNumber([0-9]+)" component={Main} />
						<Route exact path="/add" component={AddSuperHero} />
						<Route path="/superhero" component={SingleHeroPage} />
						<Route component={NoMatch} />
					</Switch>
				</Fragment>
			</Router>
		</HeroesState>
	);
}

export default App;
