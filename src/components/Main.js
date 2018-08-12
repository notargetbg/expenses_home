import React from 'React';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
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