import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../views/Home.jsx';
import About from '../views/About.jsx';
import StatementType from '../views/StatementType.jsx';

export default class View extends React.Component {
	render() {

		return (
			<div id='ui-view'>
				<Route exact path='/' component={Home}/>
				<Route path='/about' component={About}/>
				<Route path='/statement/:type' component={StatementType}/>
			</div>
		);
	}
};
