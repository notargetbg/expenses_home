import React from 'react';
import Navigation from './layout/Navigation.jsx';
import Footer from './layout/Footer.jsx';
import '../assets/styles/main.scss';

export default class App extends React.Component {    

	render() {

		return (
			<div>
				<Navigation></Navigation>
				<Footer></Footer>
			</div>
		);
	}
}