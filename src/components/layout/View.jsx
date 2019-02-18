import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../core/services/AuthService';
import Home from '../views/Home.jsx';
import About from '../views/About.jsx';
import Register from '../views/Register.jsx';
import Income from '../views/Income.jsx';
import Expenses from '../views/Expenses.jsx';
import Categories from '../views/Categories.jsx';

const ProtectedUserRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
	  AuthService.isUserLoggedIn()
			? <Component {...props} />
			: <Redirect to='/' />
	)} />
);

export default class View extends React.Component {
	render() {

		return (
			<div id='ui-view' className='h-100'>
				<Route exact path='/' component={Home}/>
				<Route path='/about' component={About}/>
				<Route path='/register' component={Register}/>
				<ProtectedUserRoute path='/income' component={Income}/>
				<ProtectedUserRoute path='/expenses' component={Expenses}/>
				<ProtectedUserRoute path='/categories' component={Categories}/>
			</div>
		);
	}
};
