import React from 'react';
import { Container, Row, Col, Jumbotron, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { budgetSelector } from '../../store/selectors/budgetSelector';
import LoginForm from '../common/LoginForm';
import defaultImage from '../../assets/images/user-default.png';

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
		this.props.userLogin(name, password).then(res => console.log(res));
	}

	formatAsDisplayName = (email) => {
		if (!email) {
			return;
		}

		return email.split('@')[0];
	};

	render() {
		const { isUserLoggedIn, loginPending, error, email } = this.props.user;

		return (
			<Container className='home-container h-100'>
				{isUserLoggedIn &&
					<Card className='my-3'>
						<CardBody>
							<img src={defaultImage} className='user-image-big' />
							<p className='lead'>Hey there, <strong>{this.formatAsDisplayName(email)}</strong>!</p>
							<hr className='' />
							<div>
								<p>Income: {this.props.budget && this.props.budget.income}</p>
								<p>Expenses: {this.props.budget && this.props.budget.expenses}</p>
								<p><strong>Funds remaining: {this.props.budget && this.props.budget.total}</strong></p>
							</div>
						</CardBody>
					</Card>
				}
				{!isUserLoggedIn &&
					<div className='h-100 d-flex justify-content-center'>
						<Jumbotron className='my-auto'>
							<h1 className=''>Hey there!</h1>
							<p className='lead'>This is our simple <span className='badge badge-secondary'>expense tracker app</span>,
							please login or <Link to='/register'>register</Link> in order to continue.</p>
							<hr className='' />

							<LoginForm isLoginPending={loginPending} handleLogin={this.handleLogin} error={error}/>
						</Jumbotron>
					</div>
				}
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		budget: budgetSelector(state)
	};
}

export default connect(mapStateToProps, {
	userLogin: actions.userLogin
})(Home);