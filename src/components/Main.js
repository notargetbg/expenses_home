import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './layout/Navigation.jsx';
import View from './layout/View.jsx';
import Footer from './layout/Footer.jsx';

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='main-container h-100'>
					<Navigation></Navigation>
					<View />
					<Footer></Footer>
				</div>
			</Router>
		);
	}
}