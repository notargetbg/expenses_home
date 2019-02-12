import React from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import LoginForm from '../common/LoginForm.jsx';

class Home extends React.Component {

	componentDidMount() {
		this.unlistenHistory = this.props.history.listen((location, action) => {
			if (this.props.user.error) {
				this.props.dispatch(actions.clearError());
			}
		});
	}

	componentWillUnmount() {
		this.unlistenHistory();
	}

	handleLogin = (name, password) => {
		this.props.dispatch(
			actions.userLogin(name, password)
		);
	}

	render() {
		const { isUserLoggedIn, loginPending, error } = this.props.user;

		return (
			<Container fluid className='home-container h-100'>
				{isUserLoggedIn &&
					<Row>
						<Col>
							<Link to='/statement/income' className='main-category main-category--income'>Income</Link>
						</Col>
						<Col>
							<Link to='/statement/expenses' className='main-category main-category--expenses'>Expenses</Link>
						</Col>
					</Row>
				}
				{!isUserLoggedIn &&
					<Row className='h-100 d-flex justify-content-center'>
						<Jumbotron className='my-auto'>
							<h1 className=''>Hey there!</h1>
							<p className='lead'>This is our simple <span className='badge badge-secondary'>expense tracker app</span>, 
							please login or <Link to='/register'>register</Link> in order to continue.</p>
							<hr className='' />

							<LoginForm isLoginPending={loginPending} handleLogin={this.handleLogin} error={error}/>
						</Jumbotron>
					</Row>
				}
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(Home);