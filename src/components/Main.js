import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';
import Navigation from './layout/Navigation';
import View from './layout/View';
import Footer from './layout/Footer';

class App extends React.Component {

	componentDidMount() {
		if (this.props.user.isUserLoggedIn) {
			this.props.dispatch(actions.getUserData());
			this.props.dispatch(actions.getUserDetails());
		}
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
}

export default connect(mapStateToProps)(App);