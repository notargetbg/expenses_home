import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Container, Row, Jumbotron } from 'reactstrap';
import RegisterForm from '../common/RegisterForm.jsx';

class Register extends React.Component {

	handleRegister = (email, password, passwordRepeat) => {
		this.props.dispatch(actions.userRegister(email, password, passwordRepeat));
	}

	componentDidMount() {
		if (this.props.user.isUserLoggedIn) {
			this.props.history.push('/');
		}

		this.unlistenHistory = this.props.history.listen((location, action) => {
			if (this.props.user.error) {
				this.props.dispatch(actions.clearError());
			}
		});
	}

	componentDidUpdate() {
		if (this.props.user.isUserLoggedIn) {
			this.props.history.push('/');
		}
	}

	componentWillUnmount() {
		this.unlistenHistory();
	}

	render() {
		const { isUserLoggedIn, registerPending, error } = this.props.user;

		return (
			<Container fluid className='home-container h-100'>

				<Row className='h-100 d-flex justify-content-center'>
					<Jumbotron className='my-auto'>
						<h1 className=''>Welcome!</h1>
						<p className='lead'>Fill in your data, in order to register.</p>
						<hr className='' />

						<RegisterForm handleRegister={this.handleRegister} isUserLoggedIn={isUserLoggedIn} registerPending={registerPending} error={error} />
					</Jumbotron>
				</Row>

			</Container>
		);
	}
};

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps)(Register);