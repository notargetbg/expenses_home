import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './layout/Navigation.jsx';
import View from './layout/View.jsx';
import Footer from './layout/Footer.jsx';
import * as actions from '../store/actions/index.js';
import { connect } from 'react-redux';

class App extends React.Component {

	componentDidMount() {
		if (this.props.user.isUserLoggedIn) {
			this.props.dispatch(actions.getUserData());
		};
	}

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

function mapStateToProps(state) {
	return {
		user: state.user,
		userData: state.userData
	};
};


export default connect(mapStateToProps)(App);